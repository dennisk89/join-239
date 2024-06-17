let colors = ['orange', 'purple', 'blue', 'pink', 'yellow', 'mint', 'green'];
let usedLetters = [];
let contactListLetters = [];

function hideOverlayEditContact() {
    let overlayEditContact = document.getElementById('overlayEditContact');
    overlayEditContact.classList.add('hide');
    document.getElementById('editContactInputName').value = '';
    document.getElementById('editContactInputMail').value = '';
    document.getElementById('editContactInputPhone').value= '';
}

function showOverlayEditContact(contactId, contactName, initials, color, email, phone) {
    let overlayEditContact = document.getElementById('overlayEditContact');
    overlayEditContact.classList.remove('hide');
    createOverlayEditContactDot(initials, color);
    insertInputValues(contactName, email, phone);
    document.getElementById('editContactDeleteBtn').onclick = function() {deleteContact(contactId);};
    document.getElementById('editContactForm').onsubmit = function() {editContact(contactId, initials, color); return false;};
}

function createOverlayEditContactDot(initials, color) {
    document.getElementById('editContactDotMobile').innerHTML = generateEditContactDotMobileHTML(initials, color);
    document.getElementById('editContactDotDesktop').innerHTML = generateEditContactDotDesktopHTML(initials, color);
}

function insertInputValues(contactName, email, phone) {
    document.getElementById('editContactInputName').value = contactName;
    document.getElementById('editContactInputMail').value = email;
    document.getElementById('editContactInputPhone').value = phone;
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
    sortContacts();
    for (i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactName = contact['name'];
        let firstInitial = contactName.charAt(0);
        let firstInitialUpper = firstInitial.toUpperCase();
        let initials = getInitials(contactName);
        let color = contact['color'];
        let contactsContainer = document.getElementById('contactsContainer' + firstInitialUpper);
        contactsContainer.innerHTML += generateContactListContentHTML(contact, initials, color);
    }
}

function sortContacts() {
    contacts.sort(function(a, b) {
        return compareStrings(a.name, b.name);
    });
}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function excerptContactListLetters() {
    for (i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactName = contact['name'];
        let firstInitial = contactName.charAt(0);
        let firstInitialUpper = firstInitial.toUpperCase();
        usedLetters.push(firstInitialUpper);
    }
    let usedLettersUnique = [...new Set(usedLetters)];
    let usedLettersUniqueSorted = usedLettersUnique.sort();
    contactListLetters.push(usedLettersUniqueSorted);
}

function getInitials(contactName) {
    let initials = contactName
        .split(' ')
        .map (word => word.charAt(0))
        .join('');
    return initials;
}

function showContactName(contactId, contactName, initials, color, email, phone) {
    let contactNameContainer = document.getElementById('contactNameContainer');
    contactNameContainer.innerHTML = '';
    contactNameContainer.innerHTML = generateContactNameHTML(contactId, contactName, initials, color, email, phone);
    let contactInfoContent = document.getElementById('contactInfoContent');
    contactInfoContent.innerHTML = '';
    contactInfoContent.innerHTML = generateContactInfoHTML(email, phone);
    let contactInfoHeader = document.getElementById('contactInfoHeader');
    contactInfoHeader.classList.remove('hide');
}

function createNewContactArray() {
    let addContactInputName = document.getElementById('addContactInputName');
    let addContactInputMail = document.getElementById('addContactInputMail');
    let addContactInputPhone = document.getElementById('addContactInputPhone');        
    let newId = generateUniqueId('c', contacts);
    let randomColor = getRandomColor();
    let newContact = {
        'id': newId,
        'name': addContactInputName.value,
        'email': addContactInputMail.value,
        'phone': addContactInputPhone.value,
        'color': randomColor,
        'initials': getInitials(addContactInputName.value)
    };
    addNewContact(newContact);
}

function getRandomColor() {
    let randomIndex;
    for (let i = 0; i < 20; i++) { // Damit der zufällige Index mehrmals generiert wird -> besserer Zufallsgenerator.
        randomIndex = Math.floor(Math.random() * colors.length);        
    }    
    return colors[randomIndex];
}

function addNewContact(newContact) {
    contacts.push(newContact);
    putData(endpointContacts, contacts);
    emptyAddContactForm();
}

function emptyAddContactForm() {
    document.getElementById('addContactInputName').value = '';
    document.getElementById('addContactInputMail').value = '';
    document.getElementById('addContactInputPhone').value = '';
}

function deleteContact(contactId) {
    let contactsRemaining = contacts.filter(contact => contact.id !== contactId);
    putData(endpointContacts, contactsRemaining);
}

async function saveEditedContact(newContactData, contactId) {
    contacts = await getData(endpointContacts);    
    let indexOfChangedContact = contacts.findIndex(x => x.id === contactId);
    contacts.splice(indexOfChangedContact, 1);
    contacts.push(newContactData);
    putData(endpointContacts, contacts);
    emptyEditContactForm();
}

function editContact(contactId, initials, color) {
    let editContactInputName = document.getElementById('editContactInputName');
    let editContactInputMail = document.getElementById('editContactInputMail');
    let editContactInputPhone = document.getElementById('editContactInputPhone');
    let newContactData = {
        'id': contactId,
        'name': editContactInputName.value,
        'email': editContactInputMail.value,
        'phone': editContactInputPhone.value,
        'color': color,
        'initials': initials
    };
    saveEditedContact(newContactData, contactId);
}

function emptyEditContactForm() {
    document.getElementById('editContactInputName').value = '';
    document.getElementById('editContactInputMail').value = '';
    document.getElementById('editContactInputPhone').value = '';
}