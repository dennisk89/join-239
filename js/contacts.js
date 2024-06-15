let contacts = [
    {
        id: 'c1',
        name: 'Anton Mayer',
        email: 'antom@gmail.com',
        phone: '+49 1111 111 11 1',
        color: 'orange',
        initials: 'AM'
    },
    {
        id: 'c2',
        name: 'Anja Schulz',
        email: 'schulz@hotmail.com',
        phone: '+49 123 456 789',
        color: 'purple',
        initials: 'AS'
    },
    {
        id: 'c3',
        name: 'Benedikt Ziegler',
        email: 'benedikt@gmail.com',
        phone: '+43 123 456 789',
        color: 'blue',
        initials: 'BZ'
    },
    {
        id: 'c4',
        name: 'Eva Fischer',
        email: 'eva@gmail.com',
        phone: '+43 3333 333 33 3',
        color: 'pink',
        initials: 'EF'
    },
    {
        id: 'c5',
        name: 'Tatjana Wolf',
        email: 'wolf@gmail.com',
        phone: '+49 2222 222 22 2',
        color: 'yellow',
        initials: 'TW'
    },
    {
        id: 'c6',
        name: 'Marcel Bauer',
        email: 'bauer@gmail.com',
        phone: '+43 987 654 321',
        color: 'mint',
        initials: 'MB'
    }    
];
// Initialen automatisch ins Array

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
    let newContact = {
        'name': addContactInputName.value,
        'email': addContactInputMail.value,
        'phone': addContactInputPhone.value,
        'color': randomColor
    };
    // console.log(newContact);
    contacts.push(newContact);
    addContactInputName.value = '';
    addContactInputMail.value = '';
    addContactInputPhone.value = '';
}