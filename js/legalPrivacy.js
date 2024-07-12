/**
 * Removes flags from localStorage when the backArrows element is clicked.
 */
document.getElementById('backArrows').addEventListener('click', function() {
    localStorage.removeItem('openedByLegalNotice');
    localStorage.removeItem('openedByPrivacyPolicy');
});

document.getElementById('backArrows2').addEventListener('click', function() {
    localStorage.removeItem('openedByLegalNotice');
    localStorage.removeItem('openedByPrivacyPolicy');
});


