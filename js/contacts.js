/**
 * @param {string[]} colors - This Array contains the possible colors for the contact/user dots.
 * @param {string[]} usedLetters - This Array contains the first letter of each contact name.
 * @param {string[]} contactListLetters - This Array contains every letter occurring in the array "usedLetters" sorted from A to Z without duplicates.
 */
let colors = ['orange', 'purple', 'blue', 'pink', 'yellow', 'mint', 'green'];
let usedLetters = [];
let contactListLetters = [];

/**
 * This function is used to get all data from the database and to show the contact list onload of contacts.html.
 */
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

/**
 * This function is used to sort the contacts-array alphabetically by name.
 */
function sortContacts() {
    contacts.sort(function(a, b) {
        return compareStrings(a.name, b.name);
    });
}

/**
 * This function is used to compare the contacts' names. They are converted into lowercase to be sorted without case sensitivity. 
 * @param {string} a - contact's name a
 * @param {string} b - contact's name b
 * @returns -1: if a comes before b / 1: if b comes before a / 0: if both are the same
 */
function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

/**
 * This function is used to show detailed information about the contact that is clicked on in the contact list. The needed HTML code is generated and shown in the div with the id "contactDetailsContainer". This function also causes that the contact details container is sliding in and that the contact clicked on in the contact list is highlighted in the desktop version.
 * @param {string} contactId - ID of the contact
 * @param {string} contactName - name of the contact
 * @param {string} initials - initials of the contact
 * @param {string} color - color of the contact's dot
 * @param {string} email - email of the contact
 * @param {string} phone - phone number of the contact
 */
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

/**
 * This function is used to empty the div with the id "contactDetailsContainer".
 */
function emptyContactDetailsContainer() {
    let contactDetailsContainer = document.getElementById('contactDetailsContainer');
    contactDetailsContainer.innerHTML = '';
}

/**
 * This function is used to hide the contact details on mobile devices.
 */
function hideContactDetailsMobile() {
    document.getElementById('mainContacts').classList.add('contacts-hide-on-mobile');
}

/**
 * This function is used to highlight the contact clicked on in the contact list (desktop version). If there was a contact highlighted before, this highlighting is removed.
 * @param {string} contactId - ID of the contact clicked on in the contact list
 */
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

/**
 * This function is used to create a new contact array and evoces that this new array is added to the contacts array on the database.
 */
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

/**
 * This function is used to get a random entry out of the global array "colors".
 * @returns random color out of the array "colors"
 */
function getRandomColor() {
    let randomIndex;
    for (let i = 0; i < 20; i++) { // Damit der zufällige Index mehrmals generiert wird -> besserer Zufallsgenerator.
        randomIndex = Math.floor(Math.random() * colors.length);        
    }    
    return colors[randomIndex];
}

/**
 * This function is used to add a new contact to the database. It then evoces that the contact form is emptied and hidden again and that the new contact is shown in the contact list; a short message informs the user that the new contact was successfully created and the details of the new contact are displayed.
 * @param {object} newContact - This array contains all entries of the new contact.
 */
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
 * This function is used to create a new contact array out of the data of a new registered user and evoces that the new array is added to the contacts array on the database.
 * @param {string} email - email of the new registered user
 * @param {string} name - name of the new registered user
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
 * This function is used to add new users to the contacts array on the database.
 * @param {object} newUser This is the data of the new contact taken from the new registered user.
 */
async function addNewUserToContacts(newUser) {
    contacts.push(newUser);
    await putData(endpointContacts, contacts);
}

/**
 * This function is used to display the details of a new added contact and evoces that this contact is highlighted in the contact list (desktop version).
 * @param {string} contactId - ID of the new contact
 * @param {string} contactName - name of the new contact
 * @param {string} initials - initials of the new contact
 * @param {string} color - color of the new contact's dot
 * @param {string} email - email of the new contact
 * @param {string} phone - phone number of the new contact
 */
function showNewContactDetails(contactId, contactName, initials, color, email, phone) {
    document.getElementById('mainContacts').classList.remove('contacts-hide-on-mobile');
    let contactDetailsContainer = document.getElementById('contactDetailsContainer');
    contactDetailsContainer.innerHTML = '';
    contactDetailsContainer.innerHTML = generateContactDetailsContainerHTML(contactId, contactName, initials, color, email, phone);
    contactDetailsContainer.classList.add('contact-details-show');
    highlightContactContainer(contactId);
}

/**
 * This function is used to delete a contact. It then evoces that the contact list is actualized and that no contact details are shown.
 * @param {string} contactId - ID of the contact
 */
async function deleteContact(contactId) {
    let contactsRemaining = contacts.filter(contact => contact.id !== contactId);
    await putData(endpointContacts, contactsRemaining);
    contacts = await getData(endpointContacts);
    showContactList();
    emptyContactDetailsContainer();
}

/**
 * This function is used to save the changes when editing an existing contact. It also evoces that the form that is used to edit contacts is emptied and that the actualized contact list and contact details are shown.
 * @param {object} newContactData - This is the array containing the new data of the edited contact.
 * @param {string} contactId - ID of the edited contact
 */
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

/**
 * This function is used when editing a contact; it creates a new array containing the contact's data. It then evoces that the changes are saved.
 * @param {string} contactId - ID of the edited contact
 * @param {string} color - color of the edited contact's dot
 */
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


// ANCHOR Overlays

/**
 * This function is used to show the overlay containing the form to add new contacts.
 */
function showOverlayAddContact() {
    let overlayAddContact = document.getElementById('overlayAddContact');
    overlayAddContact.classList.remove('d-none');
    overlayAddContact.classList.add('overlay-slide-in');
    overlayAddContact.classList.remove('overlay-slide-out');
}

/**
 * This function is used to hide the overlay containing the form to add new contacts. It also evoces that the form is emptied.
 */
function hideOverlayAddContact() {
    let overlayAddContact = document.getElementById('overlayAddContact');
    overlayAddContact.classList.remove('overlay-slide-in');
    overlayAddContact.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayAddContact.classList.add('d-none');
    }, 500); /* same duration as slide out animation */
    emptyAddContactForm();
}

/**
 * This function is used to empty the form that is used to add new contacts.
 */
function emptyAddContactForm() {
    document.getElementById('addContactInputName').value = '';
    document.getElementById('addContactInputMail').value = '';
    document.getElementById('addContactInputPhone').value = '';
}

/**
 * This function is used to show the overlay containing the form to edit contacts. It evoces that the colored dot of the contact that is being edited is created and that the name, email and phone number of the contact are already shown in the form.
 * @param {string} contactId - ID of the edited contact
 * @param {string} contactName - name of the edited contact
 * @param {string} initials - initials of the edited contact
 * @param {string} color - color of the edited contact's dot
 * @param {string} email - email of the edited contact
 * @param {string} phone - phone number of the edited contact
 */
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

/**
 * This function is used to hide the overlay containing the form to edit contacts. It also evoces that the form is emptied.
 */
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

/**
 * This function is used to empty the form that is used to edit contacts.
 */
function emptyEditContactForm() {
    document.getElementById('editContactInputName').value = '';
    document.getElementById('editContactInputMail').value = '';
    document.getElementById('editContactInputPhone').value = '';
}

/**
 * This function is used to create the colored dot of the contact to be edited; it is shown on the overlay containing the form to edit contacts.
 * @param {string} initials - initials of the edited contact
 * @param {string} color - color of the edited contact's dot
 */
function createOverlayEditContactDot(initials, color) {
    document.getElementById('editContactDotMobile').innerHTML = generateEditContactDotMobileHTML(initials, color);
    document.getElementById('editContactDotDesktop').innerHTML = generateEditContactDotDesktopHTML(initials, color);
}

/**
 * This function is used to insert the name, email and phone number of the contact to be edited into the form that is used to edit contacts.
 * @param {string} contactName - name of the edited contact
 * @param {string} email - email of the edited contact
 * @param {string} phone - phone number of the edited contact
 */
function insertInputValues(contactName, email, phone) {
    document.getElementById('editContactInputName').value = contactName;
    document.getElementById('editContactInputMail').value = email;
    document.getElementById('editContactInputPhone').value = phone;
}

/**
 * This function is used to show the overlay menu that allows the user to select if he*she wants to edit or delete a contact.
 * @param {string} contactId - ID of the contact to be edited or deleted
 * @param {string} contactName - name of the contact to be edited or deleted
 * @param {string} initials - initials of the contact to be edited or deleted
 * @param {string} color - color of the dot of the contact to be edited or deleted
 * @param {string} email - email of the contact to be edited or deleted
 * @param {string} phone - phone number of the contact to be edited or deleted
 */
function showOverlayEditDelete(contactId, contactName, initials, color, email, phone) {
    let overlayEditDelete = document.getElementById('overlayEditDelete');    
    overlayEditDelete.innerHTML = '';
    overlayEditDelete.innerHTML = generateOverlayEditDeleteHTML(contactId, contactName, initials, color, email, phone);
    overlayEditDelete.classList.remove('d-none');
    overlayEditDelete.classList.add('overlay-slide-in');
    overlayEditDelete.classList.remove('overlay-slide-out');
}

/**
 * This function is used to hide the overlay menu that allows the user to select if he*she wants to edit or delete a contact.
 */
function hideOverlayEditDelete() {
    let overlayEditDelete = document.getElementById('overlayEditDelete');
    overlayEditDelete.classList.remove('overlay-slide-in');
    overlayEditDelete.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayEditDelete.classList.add('d-none');        
    }, 500); /* same duration as slide out animation */
}

/**
 * This function is used to show a short message to inform the user that the new contact was successfully created.
 */
function showOverlayNewContactOk() {
    let overlayNewContactOk = document.getElementById('overlayNewContactOk');
    overlayNewContactOk.classList.remove('d-none');
    overlayNewContactOk.classList.add('overlay-slide-in');
    overlayNewContactOk.classList.remove('overlay-slide-out');
    setTimeout(() => {
        hideOverlayNewContactOk();
    }, 1000);    
}

/**
 * This function is used to hide the short message again that informs the user that the new contact was successfully created.
 */
function hideOverlayNewContactOk(){
    let overlayNewContactOk = document.getElementById('overlayNewContactOk');
    overlayNewContactOk.classList.remove('overlay-slide-in');
    overlayNewContactOk.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayNewContactOk.classList.add('d-none');
    }, 500); /* same duration as slide out animation */
}