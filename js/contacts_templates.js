function generateContactListHTML(contactListLetter) {
    return /*html*/`
        <div class="contact-list-letter">${contactListLetter}</div>
        <hr class="hr-contact-list">
        <div id="contactsContainer${contactListLetter}"></div>
    `;
}

function generateContactListContentHTML(user, initials, color) {
    return /*html*/`
        <div class="contact-container pointer" onclick="showUserName('${user['name']}', '${initials}', '${color}', '${user['email']}', '${user['phone']}')">
            <div class="contact-dot contact-dot-${color}">${initials}</div>
            <div>
                <div class="contact-name">${user['name']}</div>
                <div class="contact-mail">${user['email']}</div>
            </div>
        </div>
    `;
}

function generateUserNameHTML(userName, initials, color) {
    return /*html*/`
        <div class="contact-info-dot contact-dot-${color}">${initials}</div>
        <div>
            <div class="user-name">${userName}</div>
            <div class="user-edit-delete-desktop-container">
                <div class="user-edit-delete-desktop pointer" onclick="handleOverlayEditContact()">
                    <img src="./assets/img/edit.svg" class="user-edit-desktop-img">
                    <div>Edit</div>
                </div>
                <div class="user-edit-delete-desktop pointer">
                    <img src="./assets/img/delete.svg" class="user-delete-desktop-img">
                    <div>Delete</div>
                </div>                    
            </div>
        </div>
    `;
}

function generateContactInfoHTML(email, phone) {
    return /*html*/`
        <div class="contact-info-bold">Email</div>
        <div class="contact-info-mail">${email}</div>
        <div class="contact-info-bold">Phone</div>
        <div>${phone}</div>
    `;
}