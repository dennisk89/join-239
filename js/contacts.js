let colors = ['orange', 'purple', 'blue', 'pink', 'yellow', 'mint', 'green'];
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
    let randomColor = getRandomColor();
    for (let i = 0; i < 10; i++) { // Damit der zufällige Index mehrmals generiert wird -> besserer Zufallsgenerator.
        randomColor = getRandomColor();
    }
    let newId = generateUniqueId();
    let newContact = {
        'id': newId,
        'name': addContactInputName.value,
        'email': addContactInputMail.value,
        'phone': addContactInputPhone.value,
        'color': randomColor,
        'initials': getInitials(addContactInputName.value)
    };
    contacts.push(newContact);
    putData(endpointContacts, contacts);
    addContactInputName.value = '';
    addContactInputMail.value = '';
    addContactInputPhone.value = '';
}

function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateUniqueId() {
    let newId;
    do { // Do-While-Schleife: Sie sorgt dafür, dass so lange eine neue ID generiert wird, bis eine ID gefunden wurde, die noch nicht vergeben ist.
        newId = 'c' + Math.floor(Math.random() * 10000); // Math.random() erzeugt eine Zufallszahl zwischen 0 (inkl.) und 1 (exkl.); durch * 10000 wird auf einen Bereich von 0 bis 9999.999... skaliert. Math.floor rundet die Zufallszahl auf die nächste ganze Zahl ab, sodass eine Zahl zwischen 0 und 9999 entsteht.
    } while (contacts.some(contact => contact.id === newId)); // Überprüfung, ob die neu generierte ID bereits vergeben ist.
    return newId;
}