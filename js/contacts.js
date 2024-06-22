let colors = ['orange', 'purple', 'blue', 'pink', 'yellow', 'mint', 'green'];
let usedLetters = [];
let contactListLetters = [];

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

function showOverlayEditContact(contactId, contactName, initials, color, email, phone) {
    createOverlayEditContactDot(initials, color);
    insertInputValues(contactName, email, phone);
    document.getElementById('editContactDeleteBtn').onclick = function() {deleteContact(contactId);};
    document.getElementById('editContactForm').onsubmit = function() {editContact(contactId, initials, color); return false;};
    let overlayEditContact = document.getElementById('overlayEditContact');
    overlayEditContact.classList.remove('d-none');
    overlayEditContact.classList.add('overlay-slide-in');
    overlayEditContact.classList.remove('overlay-slide-out');
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
    overlayEditDelete.classList.remove('d-none');
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

function showOverlayAddContact() {
    let overlayAddContact = document.getElementById('overlayAddContact');
    overlayAddContact.classList.remove('d-none');
    overlayAddContact.classList.add('overlay-slide-in');
    overlayAddContact.classList.remove('overlay-slide-out');
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

function showContactDetails(contactId, contactName, initials, color, email, phone) {
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

async function deleteContact(contactId) {
    let contactsRemaining = contacts.filter(contact => contact.id !== contactId);
    await putData(endpointContacts, contactsRemaining);
    showContactList();
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