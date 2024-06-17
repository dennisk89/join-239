function generateContactListHTML(contactListLetter) {
    return /*html*/`
        <div class="contact-list-letter">${contactListLetter}</div>
        <hr class="hr-contact-list">
        <div id="contactsContainer${contactListLetter}"></div>
    `;
}

function generateContactListContentHTML(contact, initials, color) {
    return /*html*/`
        <div class="contact-container pointer" onclick="showContactName('${contact['id']}', '${contact['name']}', '${initials}', '${color}', '${contact['email']}', '${contact['phone']}')">
            <div class="contact-list-dot contact-dot-${color}">${initials}</div>
            <div>
                <div class="contact-list-name">${contact['name']}</div>
                <div class="contact-mail">${contact['email']}</div>
            </div>
        </div>
    `;
}

function generateContactNameHTML(contactId, contactName, initials, color, email, phone) {
    return /*html*/`
        <div class="contact-info-dot contact-dot-${color}">${initials}</div>
        <div>
            <div class="contact-info-name">${contactName}</div>
            <div class="contact-edit-delete-desktop-container">
                <div class="contact-edit-delete-desktop pointer" onclick="showOverlayEditContact('${contactId}', '${contactName}', '${initials}', '${color}', '${email}', '${phone}')">
                    <img src="./assets/img/edit.svg" class="contact-edit-desktop-img">
                    <div>Edit</div>
                </div>
                <div class="contact-edit-delete-desktop pointer" onclick="deleteContact('${contactId}')">
                    <img src="./assets/img/delete.svg" class="contact-delete-desktop-img">
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

function generateEditContactDotMobileHTML(initials, color) {
    return /*html*/`
        <div class="edit-contact-dot edit-contact-dot-mobile contact-dot-${color}">${initials}</div>
    `;
}

function generateEditContactDotDesktopHTML(initials, color) {
    return /*html*/`
        <div class="edit-contact-dot edit-contact-dot-desktop contact-dot-${color}">${initials}</div>
    `;
}