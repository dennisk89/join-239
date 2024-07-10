document.getElementById('backArrows').addEventListener('click', function() {
    localStorage.removeItem('openedByLegalNotice');
    localStorage.removeItem('openedByPrivacyPolicy');
});
