// function taskChanger() {

// }


// ANCHOR load Tasks
async function initBoard() {
    await initJoin();
    addCardsToBoards('toDoColumn', todoTasks, 'To do');
    addCardsToBoards('inProgressColumn', progressTasks, 'In progress');
    addCardsToBoards('feedbackColumn', feedbackTasks, 'Await feedback');
    addCardsToBoards('doneColumn', doneTasks, 'Done');
    addInfosToCards();
}


function addCardsToBoards(columnID, filterArray, stringForEmptyColumn) {
    let element = document.getElementById(columnID);
    element.innerHTML = '';
    if (filterArray.length == 0) {
        element.innerHTML = boardPlaceholderHTML(stringForEmptyColumn);
    } else {
        for (let i = 0; i < filterArray.length; i++) {
            element.innerHTML += taskCardHTML(filterArray[i].id, taskType[filterArray[i].type], filterArray[i].title, filterArray[i].description, prioIcons[filterArray[i].prio]);
        }
    }
}


function addInfosToCards() {
    for (let i = 0; i < taskArray.length; i++) {
        addContactLabelsToCards(i);
        addSubTaskProgressToCards(i);
    }
}


function addContactLabelsToCards(i) {
    let max = getLabelMaximum(taskArray[i].assigned)
    let container = document.getElementById(taskArray[i].id).children[3].children[0];
    container.innerHTML = '';
    for (let j = 0; j < max; j++) {
        let assignee = getContactByContactID(taskArray[i].assigned[j]);
        if (j == 0) {
            container.innerHTML += addAssignHTML(assignee.initials, assignee.color);
        } else {
            container.innerHTML += addAssignWithOverlapHTML(assignee.initials, assignee.color, j);
        }
    }
}


function getContactByContactID(contactID) {
    let contactArray = contacts.filter(c => c.id == contactID);
    return contactArray[0];
}


function getLabelMaximum(contacts) {
    if (contacts.length >= 3) {
        return 3;
    } else {
        return contacts.length;
    }
}


function addSubTaskProgressToCards(i) {
    let pbar = document.getElementById(taskArray[i].id).children[2].children[0].children[0];
    let label = document.getElementById(taskArray[i].id).children[2].children[1];
    let done = taskArray[i].subTaskStatus.filter(s => s == true);
    label.innerHTML = /*html*/`${done.length}/${taskArray[i].subTask.length} Subtasks`;
    pbar.style.width = ((done.length / taskArray[i].subTask.length) * 100) + '%';
}


async function createTask(type, title, description, date, assignees, prio, status, subtasks, subtaskStatus) {
    let newTask = new Task(generateUniqueId('t', taskArray), type, title, description, date, assignees, prio, status, subtasks, subtaskStatus);
    taskArray.push(newTask);
    await putData(endpointTasks, taskArray);
    initBoard();
}



// ANCHOR open Task details
function openTasks(id) {
    let task = getTaskById(id);
    document.getElementById('taskOverlay').style.display = 'flex';
    document.getElementById('taskOverlay').innerHTML = taskHTML(task.id, taskType[task.type], task.title, task.description, task.dueDate, prioIcons[task.prio]);
    renderAssignees(task);
    renderSubTasks(task); 
}


function renderAssignees(task) {
    let taskAssignees = pushTaskAssigneeInfosToArray(task);
    for (let i = 0; i < taskAssignees.length; i++) {
        document.getElementById('taskAssign').innerHTML += taskAssignHTML(taskAssignees[i].color, taskAssignees[i].initials, taskAssignees[i].name)
    }
}


function pushTaskAssigneeInfosToArray(task) {
    let taskAssignees = [];
    for (let i = 0; i < task.assigned.length; i++) {
        taskAssignees.push(getContactByContactID(task.assigned[i]));
    }
    return taskAssignees   
}


function renderSubTasks(task) {
    let subtaskContainer = document.getElementById('taskOverlaySubtasks');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < task.subTask.length; i++) {
        if (task.subTaskStatus[i]) {
            subtaskContainer.innerHTML += taskSubTaskDoneHTML(i, task.subTask[i]);
        } else {
            subtaskContainer.innerHTML += taskSubTaskHTML(i, task.subTask[i]);
        }
    }
}


function getTaskById(id) {
    return taskArray[taskArray.findIndex(t => t.id === id)]
}

// ANCHOR Menu functionality
function stopP(event) {
    event.stopPropagation();
}


function openAddTaskOverlay() {
    document.getElementById('taskOverlay').style.display = 'flex';
    document.getElementById('taskOverlay').innerHTML = addTaskOverlayHTML();
}


function closeTask() {
    document.getElementById('taskOverlay').style.display = 'none';
}


function checkSubTask(subtaskId) {
    let taskId = document.getElementsByClassName('open-task')[0].id.replace('detailsFor', '');
    let taskArrayIndex = taskArray.findIndex(t => t.id === taskId)
    subtaskId = subtaskId.replace('sub', '');
    taskArray[taskArrayIndex].subTaskStatus[subtaskId] = changeSubTaskStatus(taskArray[taskArrayIndex].subTaskStatus[subtaskId]);
    renderSubTasks(getTaskById(taskId));
    addSubTaskProgressToCards(taskArrayIndex);
}


function changeSubTaskStatus(currentStatusBoolean) {
    if (currentStatusBoolean) {
        return false;
    } else {
        return true;
    }
}