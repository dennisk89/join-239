// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth(app)
window.loggedInEmail = null;
window.loggedInUser = null;

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const warningmessage = document.getElementById('wrongPassword');
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            window.location.href = "./summary.html"
        })
        .catch((error) => {
            warningmessage.classList.remove('d-none');
        });
}

function loginWithPersistence() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const warningmessage = document.getElementById('wrongPassword');

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
        });
}


onAuthStateChanged(auth, async (user) => {
    if (user) {
        let usersFromFirebase = await getUsers('https://join-239-default-rtdb.europe-west1.firebasedatabase.app/users');
        loggedInEmail = user.email;
        console.log("User is signed in:", user);
        loggedInUser = getUserNameByLoggedInEmail(loggedInEmail, usersFromFirebase);
        updateUserIcon(loggedInUser);
        showUserName(loggedInUser);
        return yes;
    } else {
        // User is signed out
        console.log("No user is signed in");
    }
})

function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}


async function getUsers(url) {
    let response = await fetch(url + ".json").catch(errorFunction);
    console.log(response.status);
    return await response.json();
}


function errorFunction() {
    console.error('Fehler aufgetreten');
}


function getUserNameByLoggedInEmail(loggedInEmail, usersFromFirebase) {
    const user = usersFromFirebase.find(user => user.email === loggedInEmail);
    return user ? user.name : null;
}


function updateUserIcon(name) {
    const initials = name.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
    
    document.getElementById('userIcon').innerText = initials;
}

/**
 * This function is used to select the right greeting depending on if a user is signed in or not.
 */
function showGreeting() {
    let yesOrNo = onAuthStateChanged();
    if (yesOrNo === 'yes') {
        showGreetingLoggedInUser();
    } else {
        showGreetingGuestUser();
    }
}

/**
 * This function is used to show the right greeting on the summary page for logged in users.
 */
function showGreetingLoggedInUser() {    
    let greetingCenter = document.getElementById('greetingCenter');
    let greetingRight = document.getElementById('greetingRight');
    greetingCenter.innerHTML = '';
    greetingRight.innerHTML = '';
    greetingCenter.innerHTML = chooseGreeting() + ',';
    greetingRight.innerHTML = chooseGreeting() + ',';
}

/**
 * This function is used to show the right greeting on the summary page for guest users.
 */
function showGreetingGuestUser() {    
    let greetingCenter = document.getElementById('greetingCenter');
    let greetingRight = document.getElementById('greetingRight');
    greetingCenter.innerHTML = '';
    greetingRight.innerHTML = '';
    greetingCenter.innerHTML = chooseGreeting() + '!';
    greetingRight.innerHTML = chooseGreeting() + '!';
}

/**
 * This function is used to check the current hour and choose the greeting based on it.
 */
function chooseGreeting() {
    let d = new Date();
    let h = d.getHours();
    if (h >= 4 && h < 10) {
        return 'Good morning';
    } else if (h < 4 && h >= 10 && h < 13) {
        return  'Hello';
    } else if (h >= 13 && h < 17) {
        return 'Good afternoon';
    } else if (h >= 17) {
        return 'Good evening';
    }
}

/**
 * This function is used to show the name of the currently logged in user to greet him*her on the summary page.
 * @param {string} name This is the name of the currently logged in user.
 */
function showUserName(name) {
    let userNameCenter = document.getElementById('userNameCenter');
    userNameCenter.innerHTML = '';
    userNameCenter.innerHTML = name;
    let userNameRight = document.getElementById('userNameRight');
    userNameRight.innerHTML = '';
    userNameRight.innerHTML = name;
}


window.logOut = logOut;
window.loginWithPersistence = loginWithPersistence;
window.login = login;