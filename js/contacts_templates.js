/**
 * This function is used to generate the HTML code to show the letters of the alphabet needed for the contact list and horizontal lines. It also creates the div-containers needed to insert the content (dot, name and email of each contact).
 * @param {string} contactListLetter - This is the current entry of the array "contactListLetters".
 * @returns HTML code
 */
function generateContactListHTML(contactListLetter) {
    return /*html*/`
        <div class="contact-list-letter">${contactListLetter}</div>
        <hr class="hr-contact-list">
        <div class="contacts-container" id="contactsContainer${contactListLetter}"></div>
    `;
}

/**
 * This function is used to generate the HTML code to show colored dot with initials, name and email of each contact.
 * @param {string} contact - This is the array containing the data of the current contact.
 * @param {string} initials - These are the initials of the current contact's name.
 * @param {string} color - This is the color of the current contact.
 * @returns 
 */
function generateContactListContentHTML(contact, initials, color) {
    return /*html*/`
        <div id="contactContainer${contact['id']}" class="contact-container clickable" onclick="showContactDetails('${contact['id']}', '${contact['name']}', '${initials}', '${color}', '${contact['email']}', '${contact['phone']}')">
            <div class="contact-list-dot contact-dot-${color}">${initials}</div>
            <div>
                <div class="contact-list-name">${contact['name']}</div>
                <div class="contact-mail">${contact['email']}</div>
            </div>
        </div>
    `;
}

function generateContactDetailsContainerHTML(contactId, contactName, initials, color, email, phone) {
    return /*html*/`
        <div class="contact-name-container">
            <div class="contact-info-dot contact-dot-${color}">${initials}</div>
            <div>
                <div class="contact-info-name">${contactName}</div>
                <div class="contact-edit-delete-desktop-container">
                    <div class="contact-edit-delete-desktop clickable" onclick="showOverlayEditContact('${contactId}', '${contactName}', '${initials}', '${color}', '${email}', '${phone}')">
                        <img src="./assets/img/edit.svg" class="contact-edit-desktop-img" alt="Edit contact button">
                        <div>Edit</div>
                    </div>
                    <div class="contact-edit-delete-desktop clickable" onclick="deleteContact('${contactId}')">
                        <img src="./assets/img/delete.svg" class="contact-delete-desktop-img" alt="Delete contact button">
                        <div>Delete</div>
                    </div>                    
                </div>
            </div>
        </div>
        <div class="contact-info-header">Contact Information</div>
        <div class="contact-info-content">
            <div class="contact-info-bold">Email</div>
            <div class="contact-info-mail">${email}</div>
            <div class="contact-info-bold">Phone</div>
            <div>${phone}</div>
        </div>

        <div class="contact-menu-btn clickable" onclick="showOverlayEditDelete('${contactId}', '${contactName}', '${initials}', '${color}', '${email}', '${phone}')">
            <img src="./assets/img/more_vert.svg" alt="Open edit and delete overlay">
        </div>
    `;
}

function generateOverlayEditDeleteHTML(contactId, contactName, initials, color, email, phone) {
    return /*html*/`
        <div class="overlay-edit-delete-content">
            <table class="overlay-edit-delete-table">
                <tr>
                    <td><img src="./assets/img/edit.svg" class="overlay-edit-img clickable" alt="Edit button"></td>
                    <td class="clickable" onclick="showOverlayEditContact('${contactId}', '${contactName}', '${initials}', '${color}', '${email}', '${phone}')">Edit</td>
                </tr>
                <tr>
                    <td><img src="./assets/img/delete.svg" class="overlay-delete-img clickable" alt="Delete button"></td>
                    <td class="clickable" onclick="deleteContact('${contactId}'); hideOverlayEditDelete(); hideContactDetailsMobile()">Delete</td>
                </tr>
            </table>
        </div>
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