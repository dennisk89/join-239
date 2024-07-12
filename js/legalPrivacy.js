/**
 * Removes flags from localStorage when the backArrows element is clicked.
 */


function removeLocalStorage() {
    localStorage.removeItem('openedByLegalNotice');
    localStorage.removeItem('openedByPrivacyPolicy');
}

/**
 * Hides the footer links in the mobile footer.
 */
function hideFooterLinks() {
    const footer = document.querySelector('.mobile-footer');
    if (footer) {
        const footerLinks = footer.querySelectorAll('.footer-menu');
        footerLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
}


/**
 * Event listener for DOMContentLoaded to check localStorage flags and hide footer links if necessary.
 */
document.addEventListener("DOMContentLoaded", function() {
    const openedByLegalNotice = localStorage.getItem('openedByLegalNotice');
    const openedByPrivacyPolicy = localStorage.getItem('openedByPrivacyPolicy');

    if (openedByLegalNotice === 'true') {
        hideFooterLinks();
        localStorage.removeItem('openedByLegalNotice');
    }

    if (openedByPrivacyPolicy === 'true') {
        hideFooterLinks();
        localStorage.removeItem('openedByPrivacyPolicy');
    }
});


