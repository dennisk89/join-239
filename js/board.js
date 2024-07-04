

// ANCHOR load Task cards in board
async function initBoard() {
    await initJoin();
    addCardsToBoards('toDoColumn', todoTasks, 'To do');
    addCardsToBoards('inProgressColumn', progressTasks, 'In progress');
    addCardsToBoards('feedbackColumn', feedbackTasks, 'Await feedback');
    addCardsToBoards('doneColumn', doneTasks, 'Done');
    addInfosToCards(taskArray);
    closeTask('addTaskOverlay');
    resetSubtaskInput();
}


function addCardsToBoards(columnID, filterArray, stringForEmptyColumn) {
    let element = document.getElementById(columnID);
    element.innerHTML = '';
    if (filterArray.length == 0) {
        element.innerHTML = boardPlaceholderHTML(stringForEmptyColumn);
    } else {
        for (let i = 0; i < filterArray.length; i++) {
            element.innerHTML += taskCardHTML(filterArray[i].id, filterArray[i].type, filterArray[i].title, shortText(filterArray[i].description), prioIcons[filterArray[i].prio], filterArray[i].taskStatus);
        }
    }
}


function shortText(text) {
    if (text.length > 55) {
        let shortText = text.substring(0, 55)
        return shortText.substring(0, shortText.lastIndexOf(' ')) + '...'
    } else {
        return text
    }
}


function addInfosToCards(taskArray) {
    for (let i = 0; i < taskArray.length; i++) {
        taskArray[i].assigned ? addContactLabelsToCards(taskArray, i) : '';
        taskArray[i].subTask ? addSubTaskProgressToCards(taskArray, i) : document.getElementById(taskArray[i].id).children[2].style.display = 'none';
    }
}


function addContactLabelsToCards(taskArray, i) {
    let container = document.getElementById(taskArray[i].id).children[3].children[0];
    container.innerHTML = '';
    let validAssignees = pushTaskAssigneeInfosToArray(taskArray[i]);
    let max = getLabelMaximum(validAssignees);
    for (let j = 0; j < max; j++) {
        if (j === 5 && validAssignees.length > 6) {
            container.innerHTML += addAssignWithOverlapHTML(getRest(validAssignees), 'grey', j);
        } else {
            defineContactIconOverlap(j, validAssignees[j], container);
        }
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
    if (contacts.length >= 6) {
        return 6;
    } else {
        return contacts.length;
    }
}


function getRest(validAssignees) {
    let rest = validAssignees.length - 5;
    return '+' + String(rest);
}


function addSubTaskProgressToCards(taskArray, i) {
    let pbar = document.getElementById(taskArray[i].id).children[2].children[0].children[0];
    let label = document.getElementById(taskArray[i].id).children[2].children[1];
    let done = taskArray[i].subTaskStatus.filter(s => s == true);
    label.innerHTML = /*html*/`${done.length}/${taskArray[i].subTask.length} Subtasks`;
    pbar.style.width = ((done.length / taskArray[i].subTask.length) * 100) + '%';
}


function closeTask(id) {
    let taskOverlay = document.getElementById(id);
    taskOverlay.classList.remove('show');
    taskOverlay.classList.add('hide');
    setTimeout(() => {
        resetGlobalTaskVariables();
        taskOverlay.style.display = 'none';
        taskOverlay.classList.remove('hide');
    }, 125);
}


// ANCHOR task search
function checkSearch() {
    let searchString = document.getElementById('taskSearch').children[0].value;
    if (searchString.length > 0) {
        filterTaskBySearch(searchString)
    } else {
        initBoard();
    }
}


function filterTaskBySearch(searchString) {
    let results = [];
    taskArray.forEach(t => {
        if (t.title.toUpperCase().indexOf(searchString.toUpperCase()) > -1 || t.description.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
            results.push(t);
        }
    });
    addCardsToBoards('toDoColumn', results.filter(t => t.taskStatus == 'todo'), 'To do');
    addCardsToBoards('inProgressColumn', results.filter(t => t.taskStatus == 'progress'), 'In progress');
    addCardsToBoards('feedbackColumn', results.filter(t => t.taskStatus == 'feedback'), 'Await feedback');
    addCardsToBoards('doneColumn', results.filter(t => t.taskStatus == 'done'), 'Done');
    addInfosToCards(results);
}


document.getElementById('taskSearch').addEventListener('keyup', checkSearch);


// ANCHOR open Task details
function openTasks(id) {
    let task = getTaskById(id);
    tempSubtasks = task.subTask;
    let taskOverlay = document.getElementById('taskOverlay');
    taskOverlay.style.display = 'flex';
    taskOverlay.innerHTML = taskHTML(task.id, task.type, task.title, task.description, task.dueDate, prioIcons[task.prio]);
    if (task.assigned) renderAssignees(task);
    if (task.subTask) renderSubTasks(task);
    taskOverlay.classList.add('show');
}


function renderAssignees(task) {
    let taskAssignees = pushTaskAssigneeInfosToArray(task);
    for (let i = 0; i < taskAssignees.length; i++) {
        if (taskAssignees[i] != 'not found') {
            let taskAssigneeName = taskAssignees[i].name;
            let assigneeIsLoggedIn = proofIfContactIsLoggedIn(taskAssigneeName);
            document.getElementById('taskAssign').innerHTML += taskAssignHTML(taskAssignees[i].color, taskAssignees[i].initials, taskAssignees[i].name, assigneeIsLoggedIn);
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
    let taskIndex = taskArray.findIndex(t => t.id === id)
    document.getElementById('taskOverlay').innerHTML = editTaksOverlayHTML(id);
    fillEditForm(taskIndex);
    tempAssignees = pushTaskAssigneeInfosToArray(taskArray[taskIndex]);
    tempSubtasks = taskArray[taskIndex].subTask;
    tempSubtasksStatus = taskArray[taskIndex].subTaskStatus;
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
    renderEditSubtasks(taskArray[taskIndex]);
    renderAssigneesToTaskEdit(taskArray[taskIndex])
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
    if (task.assigned != undefined) {
        tempAssignees = task.assigned;
        renderContactBadgeUnderSelectField();
    }
}


function renderEditSubtasks(task) {
    if (task.subTask != undefined) {
        tempSubtasks = task.subTask;
        renderTempSubtasks();
    }
}


function checkSubTask(subtaskId) {
    let taskId = document.getElementsByClassName('open-task')[0].id.replace('detailsFor', '');
    let taskArrayIndex = taskArray.findIndex(t => t.id === taskId)
    subtaskId = subtaskId.replace('sub', '');
    taskArray[taskArrayIndex].subTaskStatus[subtaskId] = changeSubTaskStatus(taskArray[taskArrayIndex].subTaskStatus[subtaskId]);
    renderSubTasks(getTaskById(taskId));
    addSubTaskProgressToCards(taskArray, taskArrayIndex);
}


function changeSubTaskStatus(currentStatusBoolean) {
    return !currentStatusBoolean;
}


async function confirmEditTask(id) {
    let contentArray = [document.getElementById('titleInput').value, document.getElementById('descriptionInput').value, document.getElementById('dateInput').value]
    if (contentArray[0].length > 1 && contentArray[2].length > 0) {
        let i = taskArray.findIndex(t => t.id === id);
        setValuesToTaskArray(i, contentArray);
        await putData(endpointTasks, taskArray);
        initBoard()
    } else {
        console.log('Kein Titel oder Datum');
        // TODO hier die Fehlermeldung wie im Design ausführen
    }
    closeTask('taskOverlay');    
}


function setValuesToTaskArray(i, contentArray) {
    taskArray[i].assigned = tempAssignees;
    taskArray[i].subTask = tempSubtasks;
    taskArray[i].subTaskStatus = tempSubtasksStatus;
    taskArray[i].title = contentArray[0];
    taskArray[i].description = contentArray[1];
    taskArray[i].dueDate = contentArray[2];
    taskArray[i].prio = currentTaskPrio;
}


// SECTION add task
function openAddTaskOverlay() {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    addTaskOverlay.style.display = 'flex';
    addTaskOverlay.classList.add('show');
}


function handleAddTask() {
    if (window.innerWidth > 1200) {
        openAddTaskOverlay();
    } else {
        window.location.href = 'add_task.html';
    }
}

// ANCHOR eventListener add tasks
document.getElementById('boardAddBtn').addEventListener('click', handleAddTask);


document.getElementById('addTaskInTodo').addEventListener('click', openAddTaskOverlay);


document.getElementById('addTaskInTodo').addEventListener('click', () => {
    openAddTaskOverlay();
    taskStatus = 'progress';
});


document.getElementById('addTaskInProgress').addEventListener('click', () => {
    openAddTaskOverlay();
    taskStatus = 'progress';
});


document.getElementById('addTaskInFeedback').addEventListener('click', () => {
    openAddTaskOverlay();
    taskStatus = 'feedback';
});


document.getElementById('closeAddBtn').addEventListener('click', () => {
    closeTask('addTaskOverlay');
    resetSubtaskInput();
});

// !SECTION

/*ANCHOR - Drag and Drop*/
let currentDraggedElement;


function startDragging(id) {
    console.log('Start dragging:', id);
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveTo(id, taskStatus) {
    highlight(id);
    taskArray[taskArray.findIndex(t => t.id === currentDraggedElement)].taskStatus = taskStatus;
    await putData(endpointTasks, taskArray)
    removeHighlight(id)
    initBoard();
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}
