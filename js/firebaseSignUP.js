/**
 * @fileoverview This script initializes the Firebase app and handles user authentication 
 * and creates users with email and password.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/**
 * This function fetches any endpoint that is given by the url parameter. The response status will get logged 
 * 
 *  @async
 *  @param {string} url Endpoint to fetch.
 *  @returns {Promise<void>} Returns the response in json format.
 */
async function getData(url) {
    let response = await fetch('https://join-239-default-rtdb.europe-west1.firebasedatabase.app/users' + ".json").catch(errorFunction);
    return await response.json();
}


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
async function createNewUser() {
    const email = document.getElementById('e-mail').value.toLowerCase();
    const name = document.getElementById('name').value;
    const password = document.getElementById('confirmPassword').value;
    await storeNameAndEmail(name, email);
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
            console.log(error.code);
            const errorMessage = error.message;
            alert(errorMessage);
        });
}


/**
 * Adds a new user to the users array and updates the data on the server.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 */
async function storeNameAndEmail(name, email) {
    const user = { name: name, email: email.toLowerCase() };
    await putUserData(user);
  }
  


/**
 * This function fetches any endpoint that is given by the url parameter with the method PUT. The response status will get logged 
 * 
 *  @async
 *  @returns {Promise<void>} Returns the response in json format.
 */
async function putUserData(user) {
    let fetchUsers = await fetch('https://join-239-default-rtdb.europe-west1.firebasedatabase.app/users' + ".json").catch(errorFunction);
    let usersArray = await fetchUsers.json();
    usersArray.push(user);
    let response = await fetch('https://join-239-default-rtdb.europe-west1.firebasedatabase.app/users' + ".json", {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usersArray)
    }).catch(errorFunction);
    return await response.json();
}


/**
 * This function gets called (.catch) when the promise in other functions is not resolved. It logs an error message and gives the user a confirm with a reload option. 
 */
function errorFunction() {
    console.error('Fehler aufgetreten');
    if (confirm('Oops, something went wrong. Please reload and try again')) {
        location.reload();
    }
}


/**
 * Assigning the function to global variable so that it is available throughout the window.
 */
window.createNewUser = createNewUser;