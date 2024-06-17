

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


function taskHTML(id, type, title, description, dueDate, prio) {
    return /*html*/`
        <div id="detailsFor${id}" class="open-task">
            <div class="task-header">
                <img src="${type}" alt="">
                <img class="clickable" src="assets/img/close-black.svg" alt="close Task" onclick="closeTask()">
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
                <div class="task-footer">
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

function addTaskOverlayHTML() {
    return /*html*/`
        <div class="add-task-container">
            <div class="add-Task-header">
                <h1 class="add-task-headline">Add Task</h1>
                <img class="clickable" src="assets/img/close-black.svg" alt="close Task" onclick="closeTask()">
            </div>
            <form class="overlay-form">
                <div class="form-half-side">
                    <div class="input-group">
                        <label for="titleInput">Title<span class="color-red">*</span></label>
                        <input id="titleInput" class="enter-input" placeholder="Enter a title" type="text" name="Title"
                            id="titleInput" required>
                    </div>
                    <div class="input-group">
                        <label for="descriptionInput">Description</label>
                        <textarea class="enter-description-input" placeholder="Enter a description" name="Description"
                            id="descriptionInput"></textarea>
                    </div>
                    <div class="input-group">
                        <label for="selectContactsInput">Assigned to</label>
                        <select class="enter-input select-input" name="select contacts" id="selectContactsInput">
                            <option value="Select contacts">Select contacts to assign</option>
                        </select>
                    </div>
                </div>
                <div class="form-divider"></div>
                <div class="form-half-side">
                    <div class="input-group">
                        <label for="dateInput">Due date<span class="color-red">*</span></label>
                        <input id="dateInput" class="enter-input" placeholder="dd/mm/yyyy" type="text"
                            onfocus="(this.type='date')" onblur="(this.type='text'); this.placeholder='dd/mm/yyyy';">
                    </div>
                    <div class="input-group">
                        <label class="">Prio</label>
                        <div class="prio-container">
                            <div class="priority-btn clickable">
                                <span>Urgent</span>
                                <img src="./assets/img/priority-low.svg" alt="">
                            </div>
                            <div class="prio-btn-selected priority-btn clickable">
                                <span>Medium</span>
                                <img src="./assets/img/priority-medium-white.svg" alt="">
                            </div>
                            <div class="priority-btn clickable">
                                <span>Low</span>
                                <img src="./assets/img/priority-urgent.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="selectCategory">Category<span class="color-red">*</span></label>
                        <select class="enter-input select-input" name="select category" id="selectCategory">
                            <option value="Select task category">Select contacts to assign</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="subtaskInput">Subtaks</label>
                        <input class="enter-input subtask-enter" placeholder="Enter a subtask" type="text" name="Subtask" id="subtaskInput">
                    </div>
                    <div class="form-btn-container">
                        <button class="board-add-btn clickable" type="submit">Create Task</button>
                    </div>
                </div>
            </form>
        </div>
    `
}