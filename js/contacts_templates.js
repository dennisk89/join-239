function generateContactListHTML(contactListLetter) {
    return /*html*/`
        <div class="contact-list-letter">${contactListLetter}</div>
        <hr class="hr-contact-list">
        <div id="contactContainer${contactListLetter}" class="contact-container pointer"></div>
    `;
}

function generateContactListContentHTML(user, initials, color) {
    return /*html*/`
        <div class="contact-dot contact-dot-${color}">${initials}</div>
        <div>
            <div class="contact-name">${user['name']}</div>
            <div class="contact-mail">${user['email']}</div>
        </div>
    `;
}