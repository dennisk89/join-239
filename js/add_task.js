async function initAddTask() {
    await initJoin();
    setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium');    
}

// ANCHOR create Tasks
async function createTask(nextFunction) {
    setTempSubtasksStatus();
    let newTask = new Task(generateUniqueId('t', taskArray), 
        document.getElementById('selectCategory').value, 
        document.getElementById('titleInput').value, 
        document.getElementById('descriptionInput').value, 
        document.getElementById('dateInput').value, 
        getIDofAssignee(tempAssignees),
        currentTaskPrio, 
        taskStatus, 
        tempSubtasks, 
        tempSubtasksStatus);
    taskArray.push(newTask);
    await putData(endpointTasks, taskArray);
    nextFunction();
}


function getIDofAssignee(assignees) {
    let assignIDs = [];
    assignees.forEach(a => assignIDs.push(a.id));
    return assignIDs;
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
    document.getElementById(id).children[1].src = iconPath;
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
    changeSelectIcon('selectFieldBtn', 'select-image', 'select-image-up');
    checkForPreSelectContacts(tempAssignees);
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
    changeSelectIcon('selectFieldBtn', 'select-image-up', 'select-image');
    document.getElementById('selectInput').setAttribute('onclick', 'openSelectContacts(); stopP(event)');
}


function checkForPreSelectContacts(assigneeArray) {
    if (assigneeArray.length > 0 && tempAssignees.length > 0) {
        for (let i = 0; i < assigneeArray.length; i++) {
            if (tempAssignees.indexOf(assigneeArray[i]) > -1) {
                updateCheckboxes(assigneeArray[i].id, 'rgba(42, 54, 71, 1)', 'white', 'checkbox-img', 'checkbox-img-checked');
            }
        }
        renderContactBadgeUnderSelectField();
    }
}


function changeSelectIcon(id, cssClass, cssClass2) {
    document.getElementById(id).classList.remove(cssClass);
    document.getElementById(id).classList.add(cssClass2);
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
    tempAssignees.push(getContactByContactID(contactId));
    renderContactBadgeUnderSelectField();
}


function deSelectContact(contactId) {
    updateCheckboxes(contactId, 'white', 'black', 'checkbox-img-checked', 'checkbox-img');
    tempAssignees.splice(tempAssignees.indexOf(contactId), 1)
    renderContactBadgeUnderSelectField();
}


function updateCheckboxes(contactId, bgColor, textColor, checkbox1Css, checkbox2Css) {
    document.getElementById(contactId).parentNode.style.backgroundColor = bgColor;
    document.getElementById(contactId).parentNode.style.color = textColor;
    document.getElementById(contactId).classList.remove(checkbox1Css);
    document.getElementById(contactId).classList.add(checkbox2Css)
}


function renderContactBadgeUnderSelectField() {
    document.getElementById('preSelectedContainer').innerHTML = '';
    for (let i = 0; i < tempAssignees.length; i++) {
        const assign = tempAssignees[i];
        if (assign != 'not found') {
            document.getElementById('preSelectedContainer').innerHTML += profileBatchHTML(assign.color, assign.initials);
        }
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
    checkForPreSelectContacts(results);
}


// ANCHOR category select 
function arrowChanger() {
    if (document.getElementById('selectCategory').classList.contains('select-image')) {
        changeSelectIcon('selectCategory', 'select-image', 'select-image-up')
    } else {
        changeSelectIcon('selectCategory', 'select-image-up', 'select-image')
    }  
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


function addSubtaskToTempSubtasks() {
    if (document.getElementById('subtaskInput').value.length > 0) {
        if (tempSubtasks == undefined) {
            tempSubtasks = [];
            tempSubtasksStatus = [];
        }
        tempSubtasks.push(document.getElementById('subtaskInput').value);
        tempSubtasksStatus.push(false)
        resetSubtaskInput();
    }
    renderTempSubtasks(); 
}


function renderTempSubtasks() {
    document.getElementById('subtaskEditList').innerHTML = '';
    if (tempSubtasks.length > 0) {
        for (let i = 0; i < tempSubtasks.length; i++) {
            document.getElementById('subtaskEditList').innerHTML += editSubtaskListHTML(tempSubtasks[i], i);
        }
    }
}


// ANCHOR edit subtask
function editSubtask(index) {
    document.getElementById('subtaskEditList').children[index].innerHTML = renderEditSubtaskInputHTML(tempSubtasks[index], index);
    document.getElementById('subtaskEditList').children[index].classList.remove('subtask-list-row')
}


function confirmEditSubtask(i) {
    if (document.getElementById('subtaskEditInput').value.length > 0) {
        tempSubtasks.splice(i, 1, document.getElementById('subtaskEditInput').value);
        resetSubtaskInput();
        renderTempSubtasks();
    } else {
        deleteSubtask(i);
    }
}


function deleteSubtask(i) {
    tempSubtasks.splice(i, 1);
    renderTempSubtasks();
    resetSubtaskInput();
}


function setTempSubtasksStatus() {
    tempSubtasksStatus = [];
    if (tempSubtasks.length > 0) {
        tempSubtasks.forEach(() => tempSubtasksStatus.push(false));
    }
}


// ANCHOR eventListener add tasks
document.getElementById('subtaskInputFrame').addEventListener('click', changeSubtaskInput);


function blueBorder(id) {
    document.getElementById(id).style.borderColor = 'rgba(41, 171, 226, 1)'
}


document.getElementById('subtaskInput').addEventListener('keypress', e => checkKeyForEnter(e));


function checkKeyForEnter(e) {
    if (e.key == 'Enter') {
        addSubtaskToTempSubtasks();
    }
}


// ANCHOR id translation or verification functions
function pushTaskAssigneeInfosToArray(task) {
    if (task.assigned) {
        let taskAssignees = [];
        for (let i = 0; i < task.assigned.length; i++) {
            taskAssignees.push(getContactByContactID(task.assigned[i]));
        }
        let validAssignees = taskAssignees.filter(t => t != 'not found');
        return validAssignees;   
    }
}


function getContactByContactID(contactID) {
    let contactArray = contacts.filter(c => c.id == contactID);
    if (contactArray.length == 0) {
        return 'not found'
    } else {
        return contactArray[0];
    }
}

function validateTaskForm(event, nextFunction) {
    event.preventDefault(); 

    let isTitleValid = validateTitle();
    let isDateValid = validateDate();
    let isCategoryValid = validateCategory();
    
    if (isTitleValid && isDateValid && isCategoryValid) {
        createTask(nextFunction);
    }
}

function validateTitle() {
    let titleWarning = document.getElementById('titleWarningMessage');
    let title = document.getElementById('titleInput').value.trim();
    let titleBorder = document.getElementById('titleInput');
    
    if (title === "") {
        titleWarning.classList.remove('d-none');
        titleBorder.classList.add('border-red')
        return false;
    } else {
        titleWarning.classList.add('d-none');
        titleBorder.classList.remove('border-red')
        return true;
    }
}

function validateDate() {
    let dateWarning = document.getElementById('dateWarningMessage');
    let date = document.getElementById('dateInput').value.trim();
    let dateBorder = document.getElementById('dateInput');
    
    if (date === "") {
        dateWarning.classList.remove('d-none');
        dateBorder.classList.add('border-red')
        return false;
    } else {
        dateWarning.classList.add('d-none');
        dateBorder.classList.remove('border-red')
        return true;
    }
}

function validateCategory() {
    let categoryWarning = document.getElementById('categoryWarningMessage');
    let category = document.getElementById('selectCategory').value;
    let categoryBorder = document.getElementById('selectCategory');
    
    if (category === "") {
        categoryWarning.classList.remove('d-none');
        categoryBorder.classList.add('border-red');
        return false;
    } else {
        categoryWarning.classList.add('d-none');
        categoryBorder.classList.remove('border-red');
        return true;
    }
}

