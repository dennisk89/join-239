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