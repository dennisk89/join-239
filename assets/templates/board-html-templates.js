function taskCardHTML(id, type, title, description, prioIcon) {
    return /*html*/`
    <div id=${id} onclick="openTask(event); stopP(event)" class="card clickable">
        <img src=${type} alt="ticket-type">
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
        <div class="profile-batch">${initials}</div>
    `
}