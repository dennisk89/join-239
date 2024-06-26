

function taskCardHTML(id, type, title, description, prioIcon) {
    return /*html*/`
    <div id=${id} onclick="openTasks('${id}'); stopP(event)" class="card clickable">
        <img src='${type}' alt="ticket-type">
        <div class="card-text-box">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <div class="card-progress-container">
            <div class="outer-pbar" id="subtaskBar">
                <div class="inner-pbar" style="width: 0%;"></div>
            </div>
            <label for="subtaskBar"></label>
        </div>
        <div class="card-footer">
            <div class="circle-container">
            </div>
            <img class="clickable" src=${prioIcon} alt="">
        </div>
    </div>
    `
}


function addAssignHTML(initials, contactColor) {
    return /*html*/`
        <div class="profile-batch ${contactColor}">${initials}</div>
    `
}


function addAssignWithOverlapHTML(initials, contactColor, i) {
    return /*html*/`
        <div class="profile-batch ${contactColor} overlap-${i}">${initials}</div>
    `
}


function boardPlaceholderHTML(column) {
    return /*html*/`
        <div class="column-placeholder">
            <p>No tasks ${column}</p>
        </div>
    `
}


// ANCHOR task details
function taskHTML(id, type, title, description, dueDate, prio) {
    return /*html*/`
        <div id="detailsFor${id}" class="open-task">
            <div class="task-header">
                <img src="${type}" alt="">
                <img class="clickable" src="assets/img/close-black.svg" alt="close Task" onclick="closeTask('taskOverlay')">
            </div>
            <h1>${title}</h1>
            <p>${description}</p>
            <div class="task-line">
                <p class="task-p-bold">Due date:</p>
                <p>${dueDate}</p>
            </div>
            <div class="task-line">
                <p class="task-p-bold">Priority:</p>
                <p class="prio-text">Prio <img src=${prio} alt=""></p>
            </div>
            <p class="task-p-bold">Assigned To:</p>
            <div id="taskAssign"></div>
            <p class="task-p-bold">Subtasks</p>
            <div id="taskOverlaySubtasks">
                <div id="sub1" class="check-list-row">
                    <img onclick="checkSubTask(event)" class="clickable" src="assets/img/checkbox-checked.svg" alt="checkbox-checked">
                    <p>Subtask text</p>
                </div>
            </div>
            <div class="task-footer clickable">
                <div class="task-footer">
                    <img src="assets/img/delete.svg" alt="">
                    <p>Delete</p>
                </div>
                <div class="divider"></div>
                <div onclick="openEdit('${id}')" class="task-footer">
                    <img src="assets/img/edit.svg" alt="">
                    <p>Edit</p>
                </div>
            </div>
        </div>  
    `
}


function taskAssignHTML(color, initials, name) {
    return /*html*/`
        <div class="task-assigned">
            <div class="profile-batch ${color}">${initials}</div>
            <p class="assigned-name">${name}</p>
        </div>
    `
}


function taskSubTaskHTML(i, subtaskText) {
    return /*html*/`
        <div id="sub${i}" class="check-list-row">
            <img onclick="checkSubTask('sub${i}')" class="clickable" src="assets/img/checkbox.svg" alt="checkbox-empty">
            <p>${subtaskText}</p>
        </div>
    `
}


function taskSubTaskDoneHTML(i, subtaskText) {
    return /*html*/`
        <div id="sub${i}" class="check-list-row">
            <img onclick="checkSubTask('sub${i}')" class="clickable" src="assets/img/checkbox-checked.svg" alt="checkbox-checked">
            <p>${subtaskText}</p>
        </div>
    `
}



// ANCHOR edit task
function editTaksOverlayHTML(id) {
    return /*html*/`
        <div id="editFor${id}" class="open-task">
            <div class="task-header flex-end">
                <img id="closeEditOverlay" class="clickable" src="assets/img/close-black.svg" alt="close Task" onclick="closeTask('taskOverlay')">
            </div>
            <form class="edit-form" onsubmit="console.log('edit'); return false">
                <div class="input-group">
                    <label class="font-16" for="titleInput">Title<span class="color-red">*</span></label>
                    <input id="titleInput" class="enter-input font-16" placeholder="Enter a title" type="text"
                        name="Title" id="titleInput" required>
                </div>
                <div class="input-group">
                    <label class="font-16" for="descriptionInput">Description</label>
                    <textarea class="enter-description-input font-16" placeholder="Enter a description"
                        name="Description" id="descriptionInput"></textarea>
                </div>
                <div class="input-group font-16">
                    <label class="font-16" for="dateInput">Due date<span class="color-red">*</span></label>
                    <input id="dateInput" class="enter-input font-16" placeholder="dd/mm/yyyy" type="text"
                        onfocus="(this.type='date')" onblur="(this.type='text'); this.placeholder='dd/mm/yyyy';"
                        required>
                </div>
                <div class="input-group">
                    <label class="font-16">Prio</label>
                    <div class="prio-container">
                        <div onclick="setPrioBtn('prioUrgent', 'urgent-selected', './assets/img/priority-urgent-white.svg', 'urgent')" id="prioUrgent" class="priority-btn-edit clickable">
                            <span>Urgent</span>
                            <img src="./assets/img/priority-urgent.svg" alt="">
                        </div>
                        <div onclick="setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium')" id="prioMedium" class="medium-selected priority-btn-edit clickable">
                            <span>Medium</span>
                            <img src="./assets/img/priority-medium-white.svg" alt="">
                        </div>
                        <div onclick="setPrioBtn('prioLow', 'low-selected', './assets/img/priority-low-white.svg', 'low')" id="prioLow" class="priority-btn-edit clickable">
                            <span>Low</span>
                            <img src="./assets/img/priority-low.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <label class="font-16" for="selectContactsInput">Assigned to</label>
                    <div class="enter-input outer-input">
                        <input id="titleInput" class="inner-input font-16" placeholder="Select contacts to assign" type="text"
                        name="select contacts" id="selectContactsInput" required>
                        <div class="select-image clickable">
                        </div>
                    </div>
                    <div id="assigneesEdit" class="task-assigned">
                    </div>
                </div>
                <div class="input-group">
                    <label class="font-16" for="subtaskInput">Subtaks</label>
                    <input class="enter-input subtask-enter font-16 clickable" placeholder="Enter a subtask" type="text"
                        name="Subtask" id="subtaskInput">
                    <div>

                    </div>
                    <ul class="subtask-ul" id="subtaskEditList">
                    </ul>
                </div>
                <div class="form-btn-container padding-top-0">
                    <button class="board-btn-dark board-edit-btn clickable" type="submit">
                        <span>Ok</span><img src="assets/img/check.svg" alt="">
                    </button>
                </div>
            </form>
        </div>
    `
}


function profileBatchHTML(color, initials) {
    return /*html*/`
        <div class="profile-batch ${color} clickable">${initials}</div>
    `
}


function editSubtaskListHTML(subtask, i) {
    return /*html*/`
        <div class="subtask-list-row clickable">
            <li>${subtask}</li>
            <div class="flex-all-center">
                <img onclick="editSubtask(${i})" class="hide-for-hover border-divider" src="assets/img/edit.svg" alt="Edit subtask">
                <img class="hide-for-hover" src="assets/img/delete.svg" alt="Delete subtask">
            </div>
        </div>
    `
}


function optionInDropAssignedMenuHTML() {
    /*html*/`
        <option value="${value}">Select contacts to assign</option>
    `
}


function showContactsSelect(id, color, initials, name) {
    return /*html*/`
    <div onclick="checkSelectContact(event); stopP(event)" class="contacts-select-list-row clickable">
        <div class="profile-batch ${color}">${initials}</div>
        <div>${name}</div>
        <div id="${id}" class="checkbox-img"></div>
    </div>
    `
}


function addNewSubtaskHTML() {
    return /*html*/`
        <div id="addSubtaskBtn" class="sub-plus-image inner-input-img clickable"></div>    
    `
}


function writeNewSubtaskHTML() {
    return /*html*/`
        <div id="cancelSubtaskBtn" onclick="resetSubtaskInput(); stopP(event)" class="sub-cancel-image inner-input-img clickable"></div>
        <div class="sub-btn-devider"></div>
        <div id="confirmSubtaskBtn" onclick="renderTempSubtasks()" class="sub-confirm-image inner-input-img clickable"></div>    
        
    `
}



function renderEditSubtaskInputHTML(value) {
    return /*html*/`
    <div id="subtaskEditFrame" class="enter-input outer-input sub-outer-input">
        <input class="inner-input font-16" value="${value}" type="text" name="edit subtask" id="subtaskEditInput">
        <div id="subEditBtnContainer" class="sub-btn-container">
            <div id="deleteInEditSubtaskBtn" class="sub-edit-delete-image inner-input-img clickable"></div>
            <div class="sub-btn-devider"></div>
            <div id="confirmEditSubtaskBtn" class="sub-confirm-image scale-hover inner-input-img clickable"></div>
        </div>
    </div>
    `
}