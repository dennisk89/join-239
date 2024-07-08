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
        let usersFromFirebase = await getUsers('https://join-239-default-rtdb.europe-west1.firebasedatabase.app/users');
        loggedInEmail = user.email;
        console.log("User is signed in:", user);
        loggedInUser = getUserNameByLoggedInEmail(loggedInEmail, usersFromFirebase);
        if (window.location.pathname == '/index.html') 
            {window.location.href = "./summary.html";}
    } else {
        console.log("No user is signed in");
    }
    updateUserInterfaceWithLogInStatus();
})


/**
 * This function is used to update the user interface based on login status.
 */
function updateUserInterfaceWithLogInStatus() {
    if (['/summary.html', '/add_task.html', '/contacts.html', '/board.html'].includes(window.location.pathname)) {
        redirectOrShowUserIcon();
        if (window.location.pathname == '/summary.html') {
            showGreeting();
        }
    }
}

/**
 * This function is used to logout the currently signed in user.
 */

function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
    });
}


/**
 * Fetches users from the specified URL.
 * @param {string} url - The URL to fetch users from.
 * @returns {Promise<Object[]>} - A promise that resolves to the list of users.
 */
async function getUsers(url) {
    let response = await fetch(url + ".json").catch(errorFunction);
    console.log(response.status);
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
    return user.length > 0 ? user[0].name : null;
    // return user ? user[0].name : null;
}


/**
 * Assigning the functions to global variables so that they are available throughout the window.
 */
window.logOut = logOut;
window.loginWithPersistence = loginWithPersistence;
window.login = login;
window.getUserNameByLoggedInEmail = getUserNameByLoggedInEmail;