



// ANCHOR load Task cards in board
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
        taskArray[i].assigned ? addContactLabelsToCards(i) : console.log('no assignee for Task ' + taskArray[i].id);
        taskArray[i].subTask ? addSubTaskProgressToCards(i) : document.getElementById(taskArray[i].id).children[2].style.display = 'none';
    }
}


function addContactLabelsToCards(i) {
    let container = document.getElementById(taskArray[i].id).children[3].children[0];
    container.innerHTML = '';
    let validAssignees = pushTaskAssigneeInfosToArray(taskArray[i]);
    let max = getLabelMaximum(validAssignees);
    for (let j = 0; j < max; j++) {
        defineContactIconOverlap(j, validAssignees[j], container)
    }
}





function defineContactIconOverlap(j, assignee, container) {
    if (j == 0) {
        container.innerHTML += addAssignHTML(assignee.initials, assignee.color);
    } else {
        container.innerHTML += addAssignWithOverlapHTML(assignee.initials, assignee.color, j);
    }
}


function getLabelMaximum(contacts) {
    if (contacts.length >= 5) {
        return 5;
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


function closeTask(id) {
    resetGlobalTaskVariables();
    document.getElementById(id).style.display = 'none';
}


// ANCHOR open Task details
function openTasks(id) {
    let task = getTaskById(id);
    document.getElementById('taskOverlay').style.display = 'flex';
    document.getElementById('taskOverlay').innerHTML = taskHTML(task.id, taskType[task.type], task.title, task.description, task.dueDate, prioIcons[task.prio]);
    task.assigned ? renderAssignees(task) : '';
    task.subTask ? renderSubTasks(task) : '';
}


function renderAssignees(task) {
    let taskAssignees = pushTaskAssigneeInfosToArray(task);
    for (let i = 0; i < taskAssignees.length; i++) {
        if (taskAssignees[i] != 'not found') {
            document.getElementById('taskAssign').innerHTML += taskAssignHTML(taskAssignees[i].color, taskAssignees[i].initials, taskAssignees[i].name);
        }
    }
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


// ANCHOR delete Task
async function deleteTask(id) {
    taskArray.splice(taskArray.findIndex(t => t.id === id), 1);
    await putData(endpointTasks, taskArray);
    closeTask('taskOverlay');
    initBoard();
}



// ANCHOR edit Tasks
function openEdit(id) {
    document.getElementById('taskOverlay').innerHTML = editTaksOverlayHTML(id);
    fillEditForm(taskArray.findIndex(t => t.id === id));
    document.getElementById('closeEditOverlay').addEventListener('click', resetGlobalTaskVariables);
}


function fillEditForm(taskIndex) {
    let editInputIds = ['titleInput', 'descriptionInput', 'dateInput'];
    let content = [taskArray[taskIndex].title, taskArray[taskIndex].description, taskArray[taskIndex].dueDate];
    for (let j = 0; j < editInputIds.length; j++) {
        document.getElementById(editInputIds[j]).value = content[j];
    }
    setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium')
    setTaskPrio(taskArray[taskIndex].prio);
    renderEditSubtasks(taskArray[taskIndex])
}



function setTaskPrio(prio) {
    currentTaskPrio = prio
    const prioFunctions = {
        'low': () => setPrioBtn('prioLow', 'low-selected', './assets/img/priority-low-white.svg', 'low'),
        'medium': () => setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium'),
        'urgent': () => setPrioBtn('prioUrgent', 'urgent-selected', './assets/img/priority-urgent-white.svg', 'urgent')
        // prio: function
    }
    prioFunctions[prio]();
}


function renderAssigneesToTaskEdit(task) {
    tempAssignees = pushTaskAssigneeInfosToArray(task);
    for (let i = 0; i < tempAssignees.length; i++) {
        document.getElementById('assigneesEdit').innerHTML += profileBatchHTML(tempAssignees[i].color, tempAssignees[i].initials)
    }
}


function renderEditSubtasks(task) {
    tempSubtasks = task.subTask;
    for (let i = 0; i < tempSubtasks.length; i++) {
        document.getElementById('subtaskEditList').innerHTML += editSubtaskListHTML(tempSubtasks[i]);
    }
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
    return !currentStatusBoolean;
}



// SECTION add task
function openAddTaskOverlay() {
    document.getElementById('addTaskOverlay').style.display = 'flex';
}



// ANCHOR eventListener add tasks
document.getElementById('boardAddBtn').addEventListener('click', openAddTaskOverlay);


document.getElementById('closeAddBtn').addEventListener('click', () => {
    closeTask('addTaskOverlay');
    resetSubtaskInput();
});

// !SECTION





