/**
 * Initializes the add task process by setting up necessary data and UI elements.
 * 
 * This asynchronous function performs the following steps:
 * 1. Calls `initJoin` to initialize and fetch necessary data such as contacts, tasks, and users.
 * 2. Sets the priority button to 'medium' by default by calling `setPrioBtn`.
 * 
 * @async
 * @function initAddTask
 */
async function initAddTask() {
    await initJoin();
    setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium');    
}


// ANCHOR create Tasks
/**
 * Creates a new task and adds it to the task array, then updates the data on the server.
 * 
 * This asynchronous function performs the following steps:
 * 1. Sets the temporary subtasks' status.
 * 2. Creates a new task object with the provided input values.
 * 3. Pushes the new task to the `taskArray`.
 * 4. Updates the task data on the server by calling `putData`.
 * 5. Executes the next function (`nextFunction`) after the task is created and data is updated.
 * 
 * @async
 * @function createTask
 * @param {Function} nextFunction - The function to call after the task is created and data is updated.
 */
async function createTask(nextFunction) {
    disableBtnsOnLoad(true);
    setTempSubtasksStatus();
    let newTask = new Task(generateUniqueId('t', taskArray), 
        document.getElementById('catSelectValue').dataset.tasktype, 
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
    disableBtnsOnLoad(false);
    nextFunction();
}

/**
 * Retrieves the IDs of the given assignees.
 * 
 * This function iterates over the provided `assignees` array, extracts the `id` of each assignee,
 * and returns an array of assignee IDs.
 * 
 * @function getIDofAssignee
 * @param {Array<Object>} assignees - An array of assignee objects.
 * @returns {Array<string>} An array of assignee IDs.
 */
function getIDofAssignee(assignees) {
    let assignIDs = [];
    assignees.forEach(a => assignIDs.push(a.id));
    return assignIDs;
}

/**
 * Redirects the user to the board page.
 * 
 * This function changes the current window location to 'board.html', effectively redirecting the user to the board page.
 * 
 * @function redirectToBoard
 */
function redirectToBoard() {
    window.location.href = 'board.html';
}


// ANCHOR prio selection
/**
 * Sets the priority button to the selected state and updates the icon.
 * 
 * This function performs the following steps:
 * 1. Sets the `currentTaskPrio` to the provided priority value.
 * 2. Removes the selected CSS class from all priority buttons and resets their icons.
 * 3. Adds the selected CSS class to the clicked priority button and updates its icon.
 * 
 * @function setPrioBtn
 * @param {string} id - The ID of the priority button to set.
 * @param {string} cssClass - The CSS class to add for the selected state.
 * @param {string} iconPath - The path to the icon to display for the selected state.
 * @param {string} prio - The priority level to set (e.g., 'urgent', 'medium', 'low').
 */
function setPrioBtn(id, cssClass, iconPath, prio) {
    currentTaskPrio = prio;
    ['prioUrgent', 'prioMedium', 'prioLow'].forEach(idInArray => {
        document.getElementById(idInArray).classList.remove('low-selected', 'medium-selected', 'urgent-selected');
        setPrioBtnStandardIcon();
    });
    document.getElementById(id).classList.add(cssClass);
    document.getElementById(id).children[1].src = iconPath;
}

/**
 * Resets the icons of all priority buttons to their standard state.
 * 
 * This function updates the icon sources for the 'urgent', 'medium', and 'low' priority buttons
 * to their default images.
 * 
 * @function setPrioBtnStandardIcon
 */
function setPrioBtnStandardIcon() {
    document.getElementById('prioUrgent').children[1].src = './assets/img/priority-urgent.svg';
    document.getElementById('prioMedium').children[1].src = './assets/img/priority-medium.svg';
    document.getElementById('prioLow').children[1].src = './assets/img/priority-low.svg';
}



// ANCHOR Select assign in add task
/**
 * Opens the contact selection dropdown and renders the contact list.
 * 
 * This function sets the display of the contact selection list to 'flex', renders the contacts,
 * changes the select icon, checks for pre-selected contacts, and sets the onclick attribute 
 * to close the selection when clicked.
 * 
 * @function openSelectContacts
 */
function openSelectContacts() {
    document.getElementById('selectContactsList').style.display = 'flex';
    renderContactsToSelectList(contacts);
    changeSelectIcon('selectFieldBtn', 'select-image', 'select-image-up');
    checkForPreSelectContacts(tempAssignees);
    document.getElementById('selectInput').setAttribute('onclick', 'closeSelectContacts()');
}


/**
 * Opens the category selection dropdown.
 * 
 * This function sets the display of the category selection list to 'flex',
 * changes the select icon and sets the onclick attribute 
 * to close the selection when clicked.
 * 
 * @function openSelectCat
 */
function openSelectCat() {
    document.getElementById('selectCatList').style.display = 'flex';
    changeSelectIcon('selectFieldBtnCat', 'select-image', 'select-image-up');
    document.getElementById('selectCategory').setAttribute('onclick', 'closeSelectCats()');
}


/**
 * Renders the contact list in the selection dropdown.
 * 
 * This function clears the current contact list and iterates over the provided contacts array,
 * appending each contact's HTML representation to the contact list.
 * 
 * @function renderContactsToSelectList
 * @param {Array} contacts - The array of contact objects to render.
 */
function renderContactsToSelectList(contacts) {
    document.getElementById('selectContactsList').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('selectContactsList').innerHTML += showContactsSelect(contacts[i].id, contacts[i].color, contacts[i].initials, contacts[i].name);
    }
}

/**
 * Closes the contact selection dropdown and resets its contents.
 * 
 * This function clears the input field, clears the contact list, hides the contact selection list,
 * changes the select icon back, and sets the onclick attribute to open the selection when clicked.
 * 
 * @function closeSelectContacts
 */
function closeSelectContacts() {
    document.getElementById('innerSelectInput').value = '';
    document.getElementById('selectContactsList').innerHTML = '';
    document.getElementById('selectContactsList').style.display = 'none';
    changeSelectIcon('selectFieldBtn', 'select-image-up', 'select-image');
    document.getElementById('selectInput').setAttribute('onclick', 'openSelectContacts(); stopP(event)');
}


/**
 * Closes the category selection dropdown.
 * 
 * This function hides the category selection list,
 * changes the select icon back, and sets the onclick attribute to open the selection when clicked.
 * 
 * @function closeSelectContacts
 */
function closeSelectCats() {
    document.getElementById('selectCatList').style.display = 'none';
    changeSelectIcon('selectFieldBtnCat', 'select-image-up', 'select-image');
    document.getElementById('selectCategory').setAttribute('onclick', 'openSelectCat(); stopP(event)');
}


/**
 * Pre-sets the task type in the category selection element and closes the category selection dropdown.
 * 
 * This function performs the following steps:
 * 1. Sets the `data-tasktype` attribute of the category selection element (`catSelectValue`) to the specified task type.
 * 2. Updates the inner HTML of the category selection element to display the selected task type.
 * 3. Closes the category selection dropdown by calling `closeSelectCats`.
 * 
 * @function preSetTaskType
 * @param {string} taskType - The task type to set in the category selection element.
 */
function preSetTaskType(taskType) {
    document.getElementById('catSelectValue').dataset.tasktype = taskType;
    document.getElementById('catSelectValue').innerHTML = taskType;
    closeSelectCats();
}


/**
 * Checks for pre-selected contacts and updates their display.
 * 
 * This function iterates over the provided assignee array and checks if each assignee is in the 
 * `tempAssignees` array. If so, it updates the checkboxes and renders the contact badge under 
 * the select field.
 * 
 * @function checkForPreSelectContacts
 * @param {Array} assigneeArray - The array of assignee objects to check.
 */
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

/**
 * Changes the icon of a select element.
 * 
 * This function removes the first CSS class and adds the second CSS class to the element with the given ID.
 * 
 * @function changeSelectIcon
 * @param {string} id - The ID of the element whose icon should be changed.
 * @param {string} cssClass - The CSS class to remove.
 * @param {string} cssClass2 - The CSS class to add.
 */
function changeSelectIcon(id, cssClass, cssClass2) {
    document.getElementById(id).classList.remove(cssClass);
    document.getElementById(id).classList.add(cssClass2);
}

/**
 * Checks or unchecks a contact in the selection list based on its current state.
 * 
 * This function toggles the checkbox state of the contact element and either pre-selects or deselects the contact.
 * 
 * @function checkSelectContact
 * @param {Event} e - The event triggered by selecting a contact.
 */
function checkSelectContact(e) {
    if (e.currentTarget.children[2].classList.value == 'checkbox-img') {
        preSelectContact(e.currentTarget.children[2].id);
    } else {
        deSelectContact(e.currentTarget.children[2].id);
    }
}

/**
 * Pre-selects a contact and updates the display.
 * 
 * This function updates the checkboxes for the selected contact, adds the contact to the `tempAssignees` array,
 * and renders the contact badge under the select field.
 * 
 * @function preSelectContact
 * @param {string} contactId - The ID of the contact to pre-select.
 */
function preSelectContact(contactId) {
    updateCheckboxes(contactId, 'rgba(42, 54, 71, 1)', 'white', 'checkbox-img', 'checkbox-img-checked');
    tempAssignees.push(getContactByContactID(contactId));
    renderContactBadgeUnderSelectField();
}

/**
 * Deselects a contact and updates the display.
 * 
 * This function updates the checkboxes for the deselected contact, removes the contact from the `tempAssignees` array,
 * and renders the contact badge under the select field.
 * 
 * @function deSelectContact
 * @param {string} contactId - The ID of the contact to deselect.
 */
function deSelectContact(contactId) {
    updateCheckboxes(contactId, 'white', 'black', 'checkbox-img-checked', 'checkbox-img');
    tempAssignees.splice(tempAssignees.indexOf(contactId), 1);
    renderContactBadgeUnderSelectField();
}

/**
 * Updates the checkbox styles for a contact.
 * 
 * This function sets the background color, text color, and CSS classes for the checkbox of the specified contact.
 * 
 * @function updateCheckboxes
 * @param {string} contactId - The ID of the contact whose checkbox styles should be updated.
 * @param {string} bgColor - The background color to set.
 * @param {string} textColor - The text color to set.
 * @param {string} checkbox1Css - The CSS class to remove.
 * @param {string} checkbox2Css - The CSS class to add.
 */
function updateCheckboxes(contactId, bgColor, textColor, checkbox1Css, checkbox2Css) {
    document.getElementById(contactId).parentNode.style.backgroundColor = bgColor;
    document.getElementById(contactId).parentNode.style.color = textColor;
    document.getElementById(contactId).classList.remove(checkbox1Css);
    document.getElementById(contactId).classList.add(checkbox2Css);
}

/**
 * Renders the contact badges for pre-selected contacts under the select field.
 * 
 * This function clears the current content of the pre-selected container and iterates over the 
 * `tempAssignees` array, appending the HTML for each pre-selected contact's badge.
 * 
 * @function renderContactBadgeUnderSelectField
 */
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
/**
 * Filters the contacts based on the input value and updates the contact selection list.
 * 
 * This function performs the following steps:
 * 1. Opens the contact selection dropdown using `openSelectContacts`.
 * 2. Filters the `contacts` array based on the input value from the event.
 * 3. If the input value matches any contact names, adds those contacts to the `results` array.
 * 4. Renders the filtered contacts to the selection list using `renderContactsToSelectList`.
 * 5. Checks for pre-selected contacts and updates the selection accordingly using `checkForPreSelectContacts`.
 * 
 * @function filterContacts
 * @param {Event} e - The input event containing the value to filter contacts by.
 */
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

/**
 * Toggles the direction of the arrow icon in the category selection element.
 * 
 * This function checks if the 'selectCategory' element has the 'select-image' class.
 * If it does, it changes the icon to 'select-image-up'. Otherwise, it changes the icon
 * back to 'select-image'.
 * 
 * @function arrowChanger
 */
function arrowChanger() {
    if (document.getElementById('selectCategory').classList.contains('select-image')) {
        changeSelectIcon('selectCategory', 'select-image', 'select-image-up');
    } else {
        changeSelectIcon('selectCategory', 'select-image-up', 'select-image');
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
        addSubtaskToTempSubtasks()
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


/**
 * This function validates the task form, preventing default submission behavior, 
 * and if all fields are valid, shows an animation and then creates the task.
 * @param {Event} event - The event object.
 * @param {Function} nextFunction - The function to call after successful validation and animation.
 */
function validateTaskForm(event, nextFunction) {
    event.preventDefault(); 
    validateCategory()
    if (validateTitle() && validateDate() && validateCategory()) {
        successfullyAddedTaskAnimation();
        setTimeout(() => {
        createTask(nextFunction);  
        }, 1000);
    }
}


/**
 * This function validates that a title is entered.
 * @returns {boolean} - Returns true if the title is valid, false otherwise.
 */
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


/**
 * This function validates that a date is entered.
 * @returns {boolean} - Returns true if the date is valid, false otherwise.
 */
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


/**
 * This function validates that a category is selected.
 * @returns {boolean} - Returns true if the category is valid, false otherwise.
 */
function validateCategory() {
    let categoryWarning = document.getElementById('categoryWarningMessage');
    let category = document.getElementById('catSelectValue').dataset.tasktype
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


/**
 * This function is used to show a success animation when a task is successfully added.
 */
function successfullyAddedTaskAnimation() {
    let succesAnimation = document.getElementById('successfullAddedTask');
    succesAnimation.classList.add('open');
    setTimeout(() => {
        succesAnimation.classList.add('closed');
    }, 1000);
}