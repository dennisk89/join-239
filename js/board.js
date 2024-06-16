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
            element.innerHTML += taskCardHTML(filterArray[i].id, filterArray[i].type, filterArray[i].title, filterArray[i].description, prioIcons[filterArray[i].prio]);
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


function createTask() {
    let newTask = new Task(
        getNewTaskArrayIndex(),
        'assets\img\board-card-label-us.svg',
        'Kochwelt html',
        'Write html code for Kochwelt',
        '2024-7-1',
        ['Homer Simpson', 'Gordon Shumway'],
        'Urgent',
        [false, false],
        ['Link style.css in index.html.', 'Write all html elements.'],
        'todo'
    );
    taskArray.push(newTask)
}

function getNewTaskArrayIndex() {
    if (taskArray.length == 0) {
        return 0;
    } else {
        return taskArray.length;
    }
}


// ANCHOR open Task details
function openTasks(taskArrayIndex) {
    document.getElementById('taskOverlay').style.display = 'flex';
    document.getElementById('taskOverlay').innerHTML = taskHTML(taskArrayIndex);
    renderAssignees(taskArrayIndex);
    renderSubTasks(taskArrayIndex); 
}


function renderAssignees(taskArrayIndex) {
    let taskAssignees = pushTaskAssigneesToArray(taskArrayIndex);
    for (let i = 0; i < taskAssignees.length; i++) {
        document.getElementById('taskAssign').innerHTML += taskAssignHTML(taskAssignees[i].color, taskAssignees[i].initials, taskAssignees[i].name)
    }
}


function pushTaskAssigneesToArray(taskArrayIndex) {
    let taskAssignees = [];
    for (let i = 0; i < taskArray[taskArrayIndex].assigned.length; i++) {
        taskAssignees.push(getContactByContactID(taskArray[taskArrayIndex].assigned[i]));
    }
    return taskAssignees   
}


function renderSubTasks(taskArrayIndex) {
    let array = taskArray[taskArrayIndex].subTask;
    let subtaskContainer = document.getElementById('taskOverlaySubtasks');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        if (taskArray[taskArrayIndex].subTaskStatus[i]) {
            subtaskContainer.innerHTML += taskSubTaskDoneHTML(i, array[i]);
        } else {
            subtaskContainer.innerHTML += taskSubTaskHTML(i, array[i]);
        };
    }
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


function checkSubTask(id) {
    let taskArrayIndex = document.getElementById('taskOverlay').children[0].id.charAt(4);
    let subTaskId = id.charAt(3);
    taskArray[taskArrayIndex].subTaskStatus[subTaskId] = changeSubTaskStatus(taskArray[taskArrayIndex].subTaskStatus[subTaskId]);
    renderSubTasks(taskArrayIndex);
    addSubTaskProgressToCards(taskArrayIndex)
}


function changeSubTaskStatus(currentStatusBoolean) {
    if (currentStatusBoolean) {
        return false;
    } else {
        return true;
    }
}