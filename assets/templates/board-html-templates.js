function taskCardHTML(id, type, title, description, prioIcon) {
    return /*html*/`
    <div id=${id} onclick="openTask(${id}); stopP(event)" class="card clickable">
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
                <div class="task-footer clickable">
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