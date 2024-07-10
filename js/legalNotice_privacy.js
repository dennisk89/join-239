/**
 * Initializes the page once the DOM content is loaded.
 * - Checks if a guest user is active or if a user is logged in based on local storage values.
 * - If no guest user is active and no user is logged in, hides footer links in the mobile footer.
 *
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function() {
    const guestUserActive = JSON.parse(localStorage.getItem('guestUserActive'));
    
    if (!guestUserActive && !loggedInEmail) {
        const footerLinks = document.querySelectorAll('.mobile-footer .footer-menu');
        footerLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
});