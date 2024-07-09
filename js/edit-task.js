// ANCHOR edit Tasks
function openEdit(id) {
    let taskIndex = taskArray.findIndex(t => t.id === id)
    document.getElementById('taskOverlay').innerHTML = editTaksOverlayHTML(id);
    fillEditForm(taskIndex);
    if (taskArray[taskIndex].assigned) {
        tempAssignees = pushTaskAssigneeInfosToArray(taskArray[taskIndex]);
    }
    if (taskArray[taskIndex].subTask) {
        tempSubtasks = taskArray[taskIndex].subTask;
        tempSubtasksStatus = taskArray[taskIndex].subTaskStatus;
    }
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
        tempAssignees = pushTaskAssigneeInfosToArray(task);
        renderContactBadgeUnderSelectField();
    }
}


function renderEditSubtasks(task) {
    if (task.subTask != undefined) {
        tempSubtasks = task.subTask;
        renderTempSubtasks();
    }
}


async function checkSubTask(subtaskId) {
    let taskId = document.getElementsByClassName('open-task')[0].id.replace('detailsFor', '');
    let taskArrayIndex = taskArray.findIndex(t => t.id === taskId)
    subtaskId = subtaskId.replace('sub', '');
    taskArray[taskArrayIndex].subTaskStatus[subtaskId] = changeSubTaskStatus(taskArray[taskArrayIndex].subTaskStatus[subtaskId]);
    renderSubTasks(getTaskById(taskId));
    addSubTaskProgressToCards(taskArray, taskArrayIndex);
    await putData(endpointTasks, taskArray);
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
        // TODO form validation
    }
    closeTask('taskOverlay');
}


function setValuesToTaskArray(i, contentArray) {
    taskArray[i].assigned = getIDofAssignee(tempAssignees);
    taskArray[i].subTask = tempSubtasks;
    taskArray[i].subTaskStatus = tempSubtasksStatus;
    taskArray[i].title = contentArray[0];
    taskArray[i].description = contentArray[1];
    taskArray[i].dueDate = contentArray[2];
    taskArray[i].prio = currentTaskPrio;
}