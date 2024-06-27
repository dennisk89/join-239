
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

function login(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            window.location.href = "./summary.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
};

function loginWithPersistence() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log("User is signed in:", user);
    } else {
        // User is signed out
        console.log("No user is signed in");
    }
});

function signOut(){
firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
}

window.signOut = signOut;
window.loginWithPersistence = loginWithPersistence;
window.login = login;
