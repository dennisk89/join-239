// async function taskChanger() {
//     taskArray[0].assigned = ['c5878', 'c349'];
//     taskArray[1].assigned = ['c9396', 'c9217', 'c8258'];
//     taskArray[2].assigned = ['c9989', 'c946'];
//     taskArray[3].assigned = ['c5570', 'c8868', 'c946', 'c349'];
//     taskArray[4].assigned = ['c8258', 'c9396'];
//     await putData(endpointTasks, taskArray);
// }

let tempSubtasks = [];
let tempAssignees = [];


function resetGlobalTaskVariables() {
    tempSubtasks = [];
    tempAssignees = [];
    currentTaskPrio = 'medium'
}


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
    let container = document.getElementById(taskArray[i].id).children[3].children[0];
    container.innerHTML = '';
    let validAssignees = pushTaskAssigneeInfosToArray(taskArray[i]);
    let max = getLabelMaximum(validAssignees);
    for (let j = 0; j < max; j++) {
        defineContactIconOverlap(j, validAssignees[j], container)
    }
}


function pushTaskAssigneeInfosToArray(task) {
    let taskAssignees = [];
    for (let i = 0; i < task.assigned.length; i++) {
        taskAssignees.push(getContactByContactID(task.assigned[i]));
    }
    let validAssignees = taskAssignees.filter(t => t != 'not found');
    return validAssignees;
}


function getContactByContactID(contactID) {
    let contactArray = contacts.filter(c => c.id == contactID);
    if (contactArray.length == 0) {
        return 'not found'
    } else {
        return contactArray[0];
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



// ANCHOR edit Tasks
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
        document.getElementById('assigneesEdit').innerHTML += taskAssignEditHTML(tempAssignees[i].color, tempAssignees[i].initials)
    }
}


function renderEditSubtasks(task) {
    tempSubtasks = task.subTask;
    for (let i = 0; i < tempSubtasks.length; i++) {
        document.getElementById('subtaskEditList').innerHTML += editSubtaskListHTML(tempSubtasks[i]);
    }
}


// ANCHOR Menu functionality
function stopP(event) {
    event.stopPropagation();
}


function openEdit(id) {
    document.getElementById('taskOverlay').innerHTML = editTaksOverlayHTML(id);
    fillEditForm(taskArray.findIndex(t => t.id === id));
    document.getElementById('closeEditOverlay').addEventListener('click', resetGlobalTaskVariables);
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
    return !currentStatusBoolean;
}



function setPrioBtn(id, cssClass, iconPath, prio) {
    currentTaskPrio = prio;
    ['prioUrgent', 'prioMedium', 'prioLow'].forEach(idInArray => {
        document.getElementById(idInArray).classList.remove('low-selected', 'medium-selected', 'urgent-selected');
        setPrioBtnStandardIcon();
    });
    document.getElementById(id).classList.add(cssClass);
    document.getElementById(id).children[1].src = iconPath
}


function setPrioBtnStandardIcon() {
    document.getElementById('prioUrgent').children[1].src = './assets/img/priority-urgent.svg';
    document.getElementById('prioMedium').children[1].src = './assets/img/priority-medium.svg';
    document.getElementById('prioLow').children[1].src = './assets/img/priority-low.svg';
}


function selectContactsList(openOrCloseFunction) {
    openOrCloseFunction();
}


function openSelectContacts() {
    document.getElementById('selectContactsList').style.display = 'flex';
    document.getElementById('selectContactsList').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('selectContactsList').innerHTML += showContactsSelect(contacts[i].color, contacts[i].initials, contacts[i].name);
    }
    changeSelectIcon('select-image', 'select-image-up');
    document.getElementById('selectFieldBtn').setAttribute('onclick', 'selectContactsList(closeSelectContacts)')
}


function closeSelectContacts() {
    document.getElementById('selectContactsList').innerHTML = '';
    document.getElementById('selectContactsList').style.display = 'none';
    changeSelectIcon('select-image-up', 'select-image');
    document.getElementById('selectFieldBtn').setAttribute('onclick', 'selectContactsList(openSelectContacts)')
}


function changeSelectIcon(cssClass, cssClass2) {
    document.getElementById('selectFieldBtn').classList.remove(cssClass);
    document.getElementById('selectFieldBtn').classList.add(cssClass2);
}


// ANCHOR eventListener 




