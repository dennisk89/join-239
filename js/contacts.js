let colors = ['orange', 'purple', 'blue', 'pink', 'yellow', 'mint'];
let usedLetters = [];
let contactListLetters = [];

function handleOverlayEditContact() {
    let overlayEditContact = document.getElementById('overlayEditContact');
    overlayEditContact.classList.toggle('hide');
}

function showOverlayEditDelete() {
    let overlayEditDelete = document.getElementById('overlayEditDelete');
    overlayEditDelete.classList.remove('hide');
}

function handleOverlayAddContact() {
    let overlayAddContact = document.getElementById('overlayAddContact');
    overlayAddContact.classList.toggle('hide');
}

async function showContactList() {
    await initJoin();
    excerptContactListLetters();
    let contactListContent = document.getElementById('contactListContent');
    contactListContent.innerHTML = '';
    for (i = 0; i < contactListLetters[0].length; i++) {
        let contactListLetter = contactListLetters[0][i];
        contactListContent.innerHTML += generateContactListHTML(contactListLetter);
    }
    showContactListContent();
}

function showContactListContent() {
    for (i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactName = contact['name'];
        let firstInitial = contactName.charAt(0);
        let initials = getInitials(contactName);
        let color = contact['color'];
        let contactsContainer = document.getElementById('contactsContainer' + firstInitial);
        contactsContainer.innerHTML += generateContactListContentHTML(contact, initials, color);
    }
}

function excerptContactListLetters() {
    for (i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactName = contact['name'];
        let firstInitial = contactName.charAt(0);
        usedLetters.push(firstInitial);
    }
    let usedLettersUnique = [...new Set(usedLetters)];
    contactListLetters.push(usedLettersUnique);
}

function getInitials(contactName) {
    let initials = contactName
        .split(' ')
        .map (word => word.charAt(0))
        .join('');
    return initials;
}

function showContactName(contactName, initials, color, email, phone) {
    let contactNameContainer = document.getElementById('contactNameContainer');
    contactNameContainer.innerHTML = '';
    contactNameContainer.innerHTML = generateContactNameHTML(contactName, initials, color);
    let contactInfoContent = document.getElementById('contactInfoContent');
    contactInfoContent.innerHTML = '';
    contactInfoContent.innerHTML = generateContactInfoHTML(email, phone);
    let contactInfoHeader = document.getElementById('contactInfoHeader');
    contactInfoHeader.classList.remove('hide');
}

function addNewContact() {
    let addContactInputName = document.getElementById('addContactInputName');
    let addContactInputMail = document.getElementById('addContactInputMail');
    let addContactInputPhone = document.getElementById('addContactInputPhone');
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let newID = 'c' + (contacts.length + 1);
    let newContact = {
        'id': newID,
        'name': addContactInputName.value,
        'email': addContactInputMail.value,
        'phone': addContactInputPhone.value,
        'color': randomColor,
        'initials': getInitials(addContactInputName.value)
    };
    contacts.push(newContact);
    addContactInputName.value = '';
    addContactInputMail.value = '';
    addContactInputPhone.value = '';
}