/**
 * @fileoverview This script initializes the Firebase app and handles user authentication, 
 * login, login with persistance, logout and state change management.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/**
 * Firebase configuration object
 * @type {Object}
 */
const firebaseConfig = {
    apiKey: "AIzaSyDpP5Vobsp5Ph26puR1me-zdqethD43dl0",
    authDomain: "join-239.firebaseapp.com",
    databaseURL: "https://join-239-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "join-239",
    storageBucket: "join-239.appspot.com",
    messagingSenderId: "641839341000",
    appId: "1:641839341000:web:48660cd7b3f9a196ccf4fd",
    measurementId: "G-70J970H5ZC"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initializing Firebase's authentication service
const auth = getAuth(app);


/**
 * Make variables for loggedInUser and loggedInEmail available globally.
 */
window.loggedInEmail = null;
window.loggedInUser = null;


/**
 * This function logs in the user, using email and password.
 */
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const warningmessage = document.getElementById('wrongPassword');
    const passwordContainer = document.getElementById('passwordContainer')
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = "./summary.html"
        })
        .catch((error) => {
            warningmessage.classList.remove('d-none');
            passwordContainer.classList.add('border-red');
        });   
}


/**
 * This function logs in the user with session persistence using email and password.
 */
function loginWithPersistence() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const warningmessage = document.getElementById('wrongPassword');
    const passwordContainer = document.getElementById('passwordContainer')
    // Set the persistence to session
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            // In this persistence state, sign-in will be persisted in the current session
            return signInWithEmailAndPassword(auth, email, password);
        })
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            window.location.href = "./summary.html";
            loginUser(email)
        })
        .catch((error) => {
            warningmessage.classList.remove('d-none');
            passwordContainer.classList.add('border-red');
        });
}


/**
 * This function handles authentication state changes.
 */
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('changed');
        let usersFromFirebase = await getUsers('https://join-239-default-rtdb.europe-west1.firebasedatabase.app/users');
        loggedInEmail = user.email;
        loggedInUser = getUserNameByLoggedInEmail(loggedInEmail, usersFromFirebase);
        triggerLocationBasedActions();
    }
    updateUserInterfaceWithLogInStatus();
});


function triggerLocationBasedActions() {
    removeFooterLinkLock();
    if (window.location.pathname == '/index.html') {
        window.location.href = "./summary.html";
    }
    if (window.location.pathname == '/contacts.html') {
        showContactListContent();
    }
}


/**
 * This function is used to update the user interface based on login status.
 */
function updateUserInterfaceWithLogInStatus() {
    if (['/summary.html', '/addTask.html', '/contacts.html', '/board.html'].includes(window.location.pathname)) {
        redirectToLoginWhenNotAuth();
        if (window.location.pathname == '/summary.html') {
            showGreeting();
        }
    }
}


/**
 * This function is used to logout the currently signed in user.
 */
function logOut() {
    handleGuestUser(false);
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
    });
    localStorage.removeItem('loggedInEmail');
}


/**
 * Fetches users from the specified URL.
 * @param {string} url - The URL to fetch users from.
 * @returns {Promise<Object[]>} - A promise that resolves to the list of users.
 */
async function getUsers(url) {
    let response = await fetch(url + ".json").catch(errorFunction);
    return await response.json();
}


/**
 * This function is used to handle errors.
 */
function errorFunction() {
    console.error('Fehler aufgetreten');
}


/**
 * Gets the username by the logged-in user's email.
 * @param {string} loggedInEmail - The email of the logged-in user.
 * @param {Object[]} usersFromFirebase - The list of users from Firebase.
 * @returns {string|null} - The username of the logged-in user, or null if not found.
 */
function getUserNameByLoggedInEmail(loggedInEmail, usersFromFirebase) {
    const user = usersFromFirebase.filter(user => user.email === loggedInEmail);
    return user.length > 0 ? user[0].name : askAgainForName();
}


function askAgainForName() {
    let newName = prompt('Oops, we lost your name in Signup process. Sorry! Please type in your name here')
    if (newName.length > 0) {
        createNewContactArrayOutOfNewUserArray(loggedInEmail, newName);
    }
}


/**
 * This function is used to store the information whether a guest user is logged in or not into the local storage.
 * @param {boolean} yesOrNo This variable is either filled with "true" or "false".
 */
function handleGuestUser(trueOrFalse) {
    let guestUserActive = trueOrFalse;
    localStorage.setItem('guestUserActive', JSON.stringify(guestUserActive));
  }


function removeFooterLinkLock() {
    localStorage.removeItem('openedWithoutLogin');
}

  

/**
 * Assigning the functions to global variables so that they are available throughout the window.
 */
window.logOut = logOut;
window.handleGuestUser = handleGuestUser;
window.loginWithPersistence = loginWithPersistence;
window.login = login;
window.getUserNameByLoggedInEmail = getUserNameByLoggedInEmail;
window.askAgainForName = askAgainForName;
window.removeFooterLinkLock = removeFooterLinkLock;