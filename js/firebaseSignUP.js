/**
 * @fileoverview This script initializes the Firebase app and handles user authentication 
 * and creates users with email and password.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initializes Firebase´s authentication service
const auth = getAuth(app)



/**
 * This function is used to create a new user by signup with email and password.
 */
function createNewUser() {
    const email = document.getElementById('e-mail').value.toLowerCase();
    const name = document.getElementById('name').value;
    const password = document.getElementById('confirmPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            showSuccessMessage();
            setTimeout(() => {
                window.location.href = "./summary.html";
            }, 1300);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    createNewContactArrayOutOfNewUserArray(email, name);
}


/**
 * Assigning the function to global variable so that it is available throughout the window.
 */
window.createNewUser = createNewUser;