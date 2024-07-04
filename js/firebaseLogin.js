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
const auth = getAuth(app);
window.loggedInEmail = null;
window.loggedInUser = null;

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


function updateUserInterfaceWithLogInStatus() {
    if (['/summary.html', '/add_task.html', '/contacts.html', '/board.html'].includes(window.location.pathname)) {
        redirectOrShowUserIcon();
        if (window.location.pathname == '/summary.html') {
            showGreeting();
        }
    }
}


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
    const user = usersFromFirebase.filter(user => user.email === loggedInEmail);
    return user.length > 0 ? user[0].name : null;
    // return user ? user[0].name : null;
}

window.logOut = logOut;
window.loginWithPersistence = loginWithPersistence;
window.login = login;
window.getUserNameByLoggedInEmail = getUserNameByLoggedInEmail;