// ANCHOR create Tasks
async function createTask(nextFunction) {
    console.log('new');
    let newTask = new Task(generateUniqueId('t', taskArray), 
        document.getElementById('selectCategory').value, 
        document.getElementById('titleInput').value, 
        document.getElementById('descriptionInput').value, 
        document.getElementById('dateInput').value, 
        tempAssignees, 
        currentTaskPrio, 
        'todo', 
        tempSubtasks, 
        tempSubtasksStatus);
    taskArray.push(newTask);
    await putData(endpointTasks, taskArray);
    nextFunction();
}


function redirectToBoard() {
    window.location.href = 'board.html';
}


// ANCHOR prio selection
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



// ANCHOR Select assign in add task

function openSelectContacts() {
    document.getElementById('selectContactsList').style.display = 'flex';
    renderContactsToSelectList(contacts);
    changeSelectIcon('select-image', 'select-image-up');
    checkForPreSelectContacts()
    document.getElementById('selectInput').setAttribute('onclick', 'closeSelectContacts()');
}


function renderContactsToSelectList(contacts) {
    document.getElementById('selectContactsList').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('selectContactsList').innerHTML += showContactsSelect(contacts[i].id, contacts[i].color, contacts[i].initials, contacts[i].name);
    }
}


function closeSelectContacts() {
    document.getElementById('innerSelectInput').value = '';
    document.getElementById('selectContactsList').innerHTML = '';
    document.getElementById('selectContactsList').style.display = 'none';
    changeSelectIcon('select-image-up', 'select-image');
    document.getElementById('selectInput').setAttribute('onclick', 'openSelectContacts(); stopP(event)');
}


function checkForPreSelectContacts() {
    if (tempAssignees.length > 0) {
        for (let i = 0; i < tempAssignees.length; i++) {
            updateCheckboxes(tempAssignees[i], 'rgba(42, 54, 71, 1)', 'white', 'checkbox-img', 'checkbox-img-checked');
        }
        renderContactBadgeUnderSelectField();
    }
}


function changeSelectIcon(cssClass, cssClass2) {
    document.getElementById('selectFieldBtn').classList.remove(cssClass);
    document.getElementById('selectFieldBtn').classList.add(cssClass2);
}


function checkSelectContact(e) {
    if (e.currentTarget.children[2].classList.value == 'checkbox-img') {
        preSelectContact(e.currentTarget.children[2].id)
    } else {
        deSelectContact(e.currentTarget.children[2].id)
    }
}


function preSelectContact(contactId) {
    updateCheckboxes(contactId, 'rgba(42, 54, 71, 1)', 'white', 'checkbox-img', 'checkbox-img-checked');
    tempAssignees.push(contactId);
    renderContactBadgeUnderSelectField();
}


function deSelectContact(contactId) {
    updateCheckboxes(contactId, 'white', 'black', 'checkbox-img-checked', 'checkbox-img');
    tempAssignees.splice(tempAssignees.indexOf(contactId), 1)
    renderContactBadgeUnderSelectField();
}


function updateCheckboxes(contactId, bgColor, textColor, checkbox1Css, checkbox2Css) {
    document.getElementById(contactId).parentNode.style.background = bgColor;
    document.getElementById(contactId).parentNode.style.color = textColor;
    document.getElementById(contactId).classList.remove(checkbox1Css);
    document.getElementById(contactId).classList.add(checkbox2Css)
}


function renderContactBadgeUnderSelectField() {
    document.getElementById('preSelectedContainer').innerHTML = '';
    for (let i = 0; i < tempAssignees.length; i++) {
        const assign = getContactByContactID(tempAssignees[i]);
        document.getElementById('preSelectedContainer').innerHTML += profileBatchHTML(assign.color, assign.initials);
    }
}


// ANCHOR search in select 
function filterContacts(e) {
    openSelectContacts();
    let results = [];
    contacts.forEach(c => {
        if (e.target.value.length > 0 && c.name.toUpperCase().indexOf(e.target.value.toUpperCase()) != -1) {
            results.push(c);
            renderContactsToSelectList(results);
        }
    });
    checkForPreSelectContacts();
}


// ANCHOR add subtask
function changeSubtaskInput() {
    if (document.getElementById('subBtnContainer').children[0].id == 'addSubtaskBtn') {
        document.getElementById('subBtnContainer').innerHTML = writeNewSubtaskHTML();
    }
}


function resetSubtaskInput() {
    document.getElementById('subtaskInput').value = '';
    document.getElementById('subBtnContainer').innerHTML = addNewSubtaskHTML();
}


function renderTempSubtasks() {
    if (document.getElementById('subtaskInput').value.length > 0) {
        document.getElementById('subtaskEditList').innerHTML = '';
        tempSubtasks.push(document.getElementById('subtaskInput').value)
        for (let i = 0; i < tempSubtasks.length; i++) {
            document.getElementById('subtaskEditList').innerHTML += editSubtaskListHTML(tempSubtasks[i], i);
        }
        setTempSubtasksStatus();
        document.getElementById('subtaskInput').value = '';
    }
}


function setTempSubtasksStatus() {
    tempSubtasksStatus = [];
    tempSubtasks.forEach(() => tempSubtasksStatus.push(false));
}


// ANCHOR eventListener add tasks
document.getElementById('subtaskInputFrame').addEventListener('click', changeSubtaskInput);


// ANCHOR id translation functions
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