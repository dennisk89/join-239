

function taskCardHTML(id, type, title, description, prioIcon) {
    return /*html*/`
    <div id=${id} onclick="openTasks(${id}); stopP(event)" class="card clickable">
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


function addAssignHTML(initials) {
    return /*html*/`
        <div class="profile-batch profile-lila">${initials}</div>
    `
}


function addAssignWithOverlapHTML(initials, i) {
    return /*html*/`
        <div class="profile-batch profile-lila overlap-${i}">${initials}</div>
    `
}


function boardPlaceholderHTML(column) {
    return /*html*/`
        <div class="column-placeholder">
            <p>No tasks ${column}</p>
        </div>
    `
}


function taskHTML(id) {
    return /*html*/`
        <div id="task${id}" class="open-task">
            <div class="task-header">
                <img src="${taskArray[id].type}" alt="">
                <img class="clickable" src="assets/img/close-black.svg" alt="close Task" onclick="closeTask()">
            </div>
            <h1>${taskArray[id].title}</h1>
            <p>${taskArray[id].description}</p>
            <div class="task-line">
                <p class="task-p-bold">Due date:</p>
                <p>${taskArray[id].dueDate}</p>
            </div>
            <div class="task-line">
                <p class="task-p-bold">Priority:</p>
                <p class="prio-text">Prio <img src=${prioIcons[taskArray[id].prio]} alt=""></p>
            </div>
            <p class="task-p-bold">Assigned To:</p>
            <div>
                <div class="task-assigned">
                    <div class="profile-batch profile-lila">AS</div>
                    <p class="assigned-name">Alfred Schulz</p>
                </div>
                <div class="task-assigned">
                    <div class="profile-batch profile-orange">HS</div>
                    <p class="assigned-name">Homer Simpson</p>
                </div>
            </div>
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
        <div class="padding-left-right-16px margin-bottom-96px bg-add-task">
        <h1 class="add-task-headline">Add Task</h1>
        <form class="add-task-desktop" class="width-396px" action="submit">
            <div class="add-task-desktop-gap">
                <p class="margin-8px font-20px">Title<span class="color-red">*</span></p>
                <input class="enter-title-input" placeholder="Enter a title" type="text" name="Title" id="titleInput">
                <span class="warning-message-field-required d-none">This field is requiered</span>
                <p class="margin-8px font-20px">Description</p>
                <textarea class="enter-description-input" placeholder="Enter a description" name="Description"
                    id="descriptionInput"></textarea>
                <p class="margin-8px font-20px">Assigned to</p>
                <select class="select-contacts-field" name="select contacts" id="selectContactsInput">
                    <option value="Select contacts">Select contacts to assign</option>
                </select>
                <p class="required-text"><span class="color-red">*</span>This field is requiered</p>
            </div>
            <div class="add-task-desktop-border"></div>
            <div>
                <p class="margin-8px font-20px">Due date <span class="color-red">*</span></p>
                <input class="date-input" type="text" placeholder="dd/mm/yyyy" id="dateInput"
                    onfocus="(this.type='date')" onblur="(this.type='text'); this.placeholder='dd/mm/yyyy';">
                <span class="warning-message-field-required d-none">This field is requiered</span>
                <div class="height-88px">
                    <p class="margin-8px font-20px">Prio</p>
                    <div class="justify-space-between">
                        <div class="priority-section">
                            <span>Urgent</span>
                            <img src="./assets/img/priority-low.svg" alt="">
                        </div>
                        <div class="bg-orange priority-section">
                            <span>Medium</span>
                            <img src="./assets/img/priority-medium-white.svg" alt="">
                        </div>
                        <div class="priority-section">
                            <Span>Low</Span>
                            <img src="./assets/img/priority-urgent.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="category-input d-none">
                    <span class="font-20px color-blue">Category <span class="color-red">*</span></span>
                    <select class="select-contacts-field" name="select contacts" id="selectTasksInput">
                        <option value="Select contacts">Select task Category</option>
                    </select>
                </div>
                <div class="subtask d-none">
                    <span class="font-20px color-blue">
                        Subtasks
                    </span>
                    <input class="enter-subtask-input" placeholder="Enter a subtask" type="text" name="Subtask" id="subtaskInput">
                </div>
                <div class="justify-space-between height-88px desktop-btns">
                    <p class="d-none-desktop"><span class="color-red">*</span>This field is requiered</p>
                    <div class="clear-task-btn d-none">
                        <span>Clear</span><img src="./assets/img/Vector (1).svg" alt="">
                    </div>
                    <div class="create-task-btn">
                        <span>Create Task</span>
                        <img src="./assets/img/check.svg" alt="">
                    </div>
                </div>
            </div>
        </form>
    </div>
    `
}