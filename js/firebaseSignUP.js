// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

function createNewUser() {
    const email = document.getElementById('e-mail').value;
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
}


window.createNewUser = createNewUser;