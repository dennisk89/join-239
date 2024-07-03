let colors = ['orange', 'purple', 'blue', 'pink', 'yellow', 'mint', 'green'];

/**
 * @param {string[]} usedLetters - This Array contains the first letter of each contact name.
 */
let usedLetters = [];

/**
 * @param {string[]} contactListLetters - This Array contains every letter occurring in the array "usedLetters" sorted from A to Z without duplicates.
 */
let contactListLetters = [];

async function initContacts() {
    await initJoin();
    showContactList();
}


/**
 * This function is used to show the contact list.
 * 
 */
function showContactList() {
    excerptContactListLetters();
    let contactListContent = document.getElementById('contactListContent');
    contactListContent.innerHTML = '';
    for (i = 0; i < contactListLetters[0].length; i++) {
        let contactListLetter = contactListLetters[0][i];
        contactListContent.innerHTML += generateContactListHTML(contactListLetter);
    }
    showContactListContent();
}

/**
 * This function is used to excerpt the initial letter of the first name of each contact, to sort out duplicates and push them into the array "contactListLetters" sorted from A to Z.
 */
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

/**
 * This function is used to show the content of the contact list: colored dot, name and email of each contact. It also gives the information if one of the contacts is currently logged in by adding "(You)" to his*her name.
 */
function showContactListContent() {
    sortContacts();
    for (i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactName = contact['name'];
        let firstInitial = contactName.charAt(0);
        let firstInitialUpper = firstInitial.toUpperCase();
        let initials = getInitials(contactName);
        let color = contact['color'];
        let userIsLoggedIn = proofIfContactIsLoggedIn(contactName);
        let contactsContainer = document.getElementById('contactsContainer' + firstInitialUpper);
        contactsContainer.innerHTML += generateContactListContentHTML(contact, initials, color, userIsLoggedIn);        
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

function showContactDetails(contactId, contactName, initials, color, email, phone) {
    document.getElementById('mainContacts').classList.remove('contacts-hide-on-mobile');
    let contactDetailsContainer = document.getElementById('contactDetailsContainer');
    contactDetailsContainer.innerHTML = '';
    contactDetailsContainer.classList.remove('contact-details-slide-in');
    contactDetailsContainer.classList.remove('contact-details-show');
    contactDetailsContainer.innerHTML = generateContactDetailsContainerHTML(contactId, contactName, initials, color, email, phone);
    void contactDetailsContainer.offsetWidth; /* Force reflow to reset the animation */
    contactDetailsContainer.classList.add('contact-details-slide-in');
    setTimeout(() => {
        contactDetailsContainer.classList.remove('contact-details-slide-in');
        contactDetailsContainer.classList.add('contact-details-show');
    }, 500);
    highlightContactContainer(contactId);
}

function emptyContactDetailsContainer() {
    let contactDetailsContainer = document.getElementById('contactDetailsContainer');
    contactDetailsContainer.innerHTML = '';
}

function hideContactDetailsMobile() {
    document.getElementById('mainContacts').classList.add('contacts-hide-on-mobile');
}

function highlightContactContainer(contactId) {
    let contactContainers = document.getElementsByClassName('contact-container');
    for (i = 0; i < contactContainers.length; i++) {
        let contactContainer = contactContainers[i];
        if (contactContainer.id == 'contactContainer' + contactId) {
            contactContainer.classList.add('highlightContact');
        } else {
            contactContainer.classList.remove('highlightContact');
        }
    }
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

async function addNewContact(newContact) {
    contacts.push(newContact);
    await putData(endpointContacts, contacts);
    emptyAddContactForm();
    hideOverlayAddContact();
    contacts = await getData(endpointContacts);
    showContactList();
    showNewContactDetails(newContact['id'], newContact['name'], newContact['initials'], newContact['color'], newContact['email'], newContact['phone']);
    showOverlayNewContactOk();
}

/**
 * This function is used to create a new contact array out of the data of a new registered user.
 * @param {string} email This is the email of the new registered user.
 * @param {string} name This is the name of the new registered user.
 */
function createNewContactArrayOutOfNewUserArray(email, name) {
    let newId = generateUniqueId('c', contacts);
    let randomColor = getRandomColor();
    let newContact = {
        'id': newId,
        'name': name,
        'email': email,
        'phone': '',
        'color': randomColor,
        'initials': getInitials(name)
    }
    addNewUserToContacts(newContact);
}

/**
 * This function is used to add new users to contacts.
 * @param {object} newUser This is the data of the new contact taken from the new registered user.
 */
async function addNewUserToContacts(newUser) {
    contacts.push(newUser);
    await putData(endpointContacts, contacts);
}

function showNewContactDetails(contactId, contactName, initials, color, email, phone) {
    document.getElementById('mainContacts').classList.remove('contacts-hide-on-mobile');
    let contactDetailsContainer = document.getElementById('contactDetailsContainer');
    contactDetailsContainer.innerHTML = '';
    contactDetailsContainer.innerHTML = generateContactDetailsContainerHTML(contactId, contactName, initials, color, email, phone);
    contactDetailsContainer.classList.add('contact-details-show');
    highlightContactContainer(contactId);
}

function emptyAddContactForm() {
    document.getElementById('addContactInputName').value = '';
    document.getElementById('addContactInputMail').value = '';
    document.getElementById('addContactInputPhone').value = '';
}

async function deleteContact(contactId) {
    let contactsRemaining = contacts.filter(contact => contact.id !== contactId);
    await putData(endpointContacts, contactsRemaining);
    contacts = await getData(endpointContacts);
    showContactList();
    emptyContactDetailsContainer();
}

async function saveEditedContact(newContactData, contactId) {
    contacts = await getData(endpointContacts);
    let indexOfChangedContact = contacts.findIndex(x => x.id === contactId);
    contacts.splice(indexOfChangedContact, 1);
    contacts.push(newContactData);
    await putData(endpointContacts, contacts);
    emptyEditContactForm();
    contacts = await getData(endpointContacts);
    showContactList();
    showNewContactDetails(newContactData['id'], newContactData['name'], newContactData['initials'], newContactData['color'], newContactData['email'], newContactData['phone']);
}

function editContact(contactId, color) {
    let editContactInputName = document.getElementById('editContactInputName');
    let editContactInputMail = document.getElementById('editContactInputMail');
    let editContactInputPhone = document.getElementById('editContactInputPhone');
    let newContactData = {
        'id': contactId,
        'name': editContactInputName.value,
        'email': editContactInputMail.value,
        'phone': editContactInputPhone.value,
        'color': color,
        'initials': getInitials(editContactInputName.value)
    };
    saveEditedContact(newContactData, contactId);
}

function emptyEditContactForm() {
    document.getElementById('editContactInputName').value = '';
    document.getElementById('editContactInputMail').value = '';
    document.getElementById('editContactInputPhone').value = '';
}


// Overlays

function showOverlayAddContact() {
    let overlayAddContact = document.getElementById('overlayAddContact');
    overlayAddContact.classList.remove('d-none');
    overlayAddContact.classList.add('overlay-slide-in');
    overlayAddContact.classList.remove('overlay-slide-out');
}

function hideOverlayAddContact() {
    let overlayAddContact = document.getElementById('overlayAddContact');
    overlayAddContact.classList.remove('overlay-slide-in');
    overlayAddContact.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayAddContact.classList.add('d-none');
    }, 500); /* same duration as slide out animation */
    emptyAddContactForm();
}

function showOverlayEditContact(contactId, contactName, initials, color, email, phone) {
    createOverlayEditContactDot(initials, color);
    insertInputValues(contactName, email, phone);
    document.getElementById('editContactDeleteBtn').onclick = function() {deleteContact(contactId); hideOverlayEditContact(); hideContactDetailsMobile(); return false};
    document.getElementById('editContactForm').onsubmit = function() {editContact(contactId, color); hideOverlayEditContact(); hideContactDetailsMobile(); return false};
    let overlayEditContact = document.getElementById('overlayEditContact');
    overlayEditContact.classList.remove('d-none');
    overlayEditContact.classList.add('overlay-slide-in');
    overlayEditContact.classList.remove('overlay-slide-out');
}

function hideOverlayEditContact() {
    let overlayEditContact = document.getElementById('overlayEditContact');
    overlayEditContact.classList.remove('overlay-slide-in');
    overlayEditContact.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayEditContact.classList.add('d-none');
    }, 500); /* same duration as slide out animation */
    document.getElementById('editContactInputName').value = '';
    document.getElementById('editContactInputMail').value = '';
    document.getElementById('editContactInputPhone').value= '';
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

function showOverlayEditDelete(contactId, contactName, initials, color, email, phone) {
    let overlayEditDelete = document.getElementById('overlayEditDelete');    
    overlayEditDelete.innerHTML = '';
    overlayEditDelete.innerHTML = generateOverlayEditDeleteHTML(contactId, contactName, initials, color, email, phone);
    overlayEditDelete.classList.remove('d-none');
    overlayEditDelete.classList.add('overlay-slide-in');
    overlayEditDelete.classList.remove('overlay-slide-out');
}

function hideOverlayEditDelete() {
    let overlayEditDelete = document.getElementById('overlayEditDelete');
    overlayEditDelete.classList.remove('overlay-slide-in');
    overlayEditDelete.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayEditDelete.classList.add('d-none');        
    }, 500); /* same duration as slide out animation */
}

function showOverlayNewContactOk() {
    let overlayNewContactOk = document.getElementById('overlayNewContactOk');
    overlayNewContactOk.classList.remove('d-none');
    overlayNewContactOk.classList.add('overlay-slide-in');
    overlayNewContactOk.classList.remove('overlay-slide-out');
    setTimeout(() => {
        hideOverlayNewContactOk();
    }, 1000);    
}

function hideOverlayNewContactOk(){
    let overlayNewContactOk = document.getElementById('overlayNewContactOk');
    overlayNewContactOk.classList.remove('overlay-slide-in');
    overlayNewContactOk.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayNewContactOk.classList.add('d-none');
    }, 500); /* same duration as slide out animation */
}