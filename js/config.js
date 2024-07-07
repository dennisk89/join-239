const endpointTasks = 'https://join-239-default-rtdb.europe-west1.firebasedatabase.app/tasks';
const endpointContacts = 'https://join-239-default-rtdb.europe-west1.firebasedatabase.app/contacts';
const endpointUser = 'https://join-239-default-rtdb.europe-west1.firebasedatabase.app/users';
const prioIcons = {
    'low': 'assets/img/priority-low.svg',
    'medium': 'assets/img/priority-medium.svg',
    'urgent': 'assets/img/priority-urgent.svg'
};
const taskTypeColor = {
    'Technical Task': 'type-color-green',
    'User Story': 'type-color-blue'
};
let contacts;
let taskArray;
let usersArray;
let todoTasks; 
let progressTasks;
let feedbackTasks;
let doneTasks;
let urgentTasks;
let currentTaskPrio = 'medium';
let taskStatus = 'todo';
let tempSubtasks = [];
let tempAssignees = [];
let tempSubtasksStatus = [];
let loggedInUser;
let guestUserActive = false;

function resetGlobalTaskVariables() {
    tempSubtasks = [];
    tempSubtasksStatus = [];
    tempAssignees = [];
    currentTaskPrio = 'medium';
    taskStatus = 'todo';
}


/**
 * Initializes the join process by fetching and filtering data from various endpoints.
 * 
 * @async
 * @function initJoin
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initJoin() {
    contacts = await getData(endpointContacts);
    taskArray = await getData(endpointTasks);
    usersArray = await getData(endpointUser);
    todoTasks = taskArray.filter(t => t.taskStatus == 'todo');
    progressTasks = taskArray.filter(t => t.taskStatus == 'progress');
    feedbackTasks = taskArray.filter(t => t.taskStatus == 'feedback');
    doneTasks = taskArray.filter(t => t.taskStatus == 'done');
    urgentTasks = taskArray.filter(t => t.prio === 'urgent' && t.dueDate);
}


/**
 * This function fetches any endpoint that is given by the url parameter. The response status will get logged 
 * 
 *  @async
 *  @param {string} url Endpoint to fetch.
 *  @returns {Promise<void>} Returns the response in json format.
 */
async function getData(url) {
    let response = await fetch(url + ".json").catch(errorFunction);
    console.log(response.status);
    return await response.json();
}


/**
 * This function fetches any endpoint that is given by the url parameter with the method PUT. The response status will get logged 
 * 
 *  @async
 *  @param {string} url Endpoint to fetch.
 *  @returns {Promise<void>} Returns the response in json format.
 */
async function putData(url, data = {}) {
    let response = await fetch(url + ".json", {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(errorFunction);
    console.log(response.status);
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


/* ANCHOR Header */

/**
 * This function is used to redirect to index.html, if there is neither guest nor user logged in. If there is a guest user active, the guest user icon is shown in the header; if there is a logged in user, the right user icon is shown on the header.
 */
function redirectOrShowUserIcon() {
    let checkGuestUserStatus = localStorage.getItem('guestUserActive');
    let guestUserActive = checkGuestUserStatus ? JSON.parse(checkGuestUserStatus) : false;
    if (!guestUserActive && (loggedInUser === undefined || loggedInUser === null)) {
        window.location.href = "./index.html";
    } else if (guestUserActive) {
        showGuestUserIcon();
    } else {
        updateUserIcon(loggedInUser);
    }
}

/**
 * This function is used to show the initials of the currently logged in user in the header's user icon.
 * @param {string} name This is the name of the currently logged in user.
 */
function updateUserIcon(name) {
    const userInitials = getInitials(name);
    document.getElementById('userIcon').innerHTML = userInitials;
}

/**
 * This function is used to get the initials of a name.
 * @param {string} name This is the name of the user or contact.
 * @returns The function returns the initials in uppercase.
 */
function getInitials(name) {
    let initials = name
        .split(' ')
        .map (word => word.charAt(0).toUpperCase())
        .join('');
    return initials;
}

/**
 * This function is used to show the header's icon for guest user.
 */
function showGuestUserIcon() {
    document.getElementById('userIcon').innerHTML = 'G';
}

class Task {
    constructor(id, type, title, description, dueDate, assigned, prio, taskStatus, subTask, subtaskStatus) {
        this.id = id,
            this.type = type,
            this.title = title,
            this.description = description,
            this.dueDate = dueDate,
            this.assigned = assigned,
            this.prio = prio,
            this.taskStatus = taskStatus,
            this.subTask = subTask,
            this.subTaskStatus = subtaskStatus
    }
}

function generateUniqueId(initLetter, array) {
    let newId;
    do { // Do-While-Schleife: Sie sorgt dafür, dass so lange eine neue ID generiert wird, bis eine ID gefunden wurde, die noch nicht vergeben ist.
        newId = initLetter + Math.floor(Math.random() * 10000); // Math.random() erzeugt eine Zufallszahl zwischen 0 (inkl.) und 1 (exkl.); durch * 10000 wird auf einen Bereich von 0 bis 9999.999... skaliert. Math.floor rundet die Zufallszahl auf die nächste ganze Zahl ab, sodass eine Zahl zwischen 0 und 9999 entsteht.
    } while (array.some(a => a.id === newId)); // Überprüfung, ob die neu generierte ID bereits vergeben ist.
    return newId;
}

// ANCHOR Menu functionality
function stopP(event) {
    event.stopPropagation();
}

function showMenu() {
    let menuAnimation = document.getElementById('userMenu');
    let pageOverlay = document.getElementById('pageOverlay');
    menuAnimation.style.display = 'flex'; 
    pageOverlay.style.display = 'block'; 
    menuAnimation.classList.add('show');
}

function hideMenu() {
    let menuAnimation = document.getElementById('userMenu');
    let pageOverlay = document.getElementById('pageOverlay');
    menuAnimation.classList.remove('show');
    menuAnimation.classList.add('hide');
    setTimeout(() => {
        menuAnimation.style.display = 'none';
        menuAnimation.classList.remove('hide');
        pageOverlay.style.display = 'none'; 
    }, 125); 
}

function toggleMenu() {
    let menuAnimation = document.getElementById('userMenu');
    if (menuAnimation.classList.contains('show')) {
        hideMenu();
    } else {
        showMenu();
    }
}

function shouldAddEventListener() {
    // Seiten auf denen der Eventlistener hinzugefügt werden soll.
    const pages = ['/summary.html', '/add_task.html', '/contacts.html', '/board.html'];
    return pages.includes(window.location.pathname);
}

// Event-Listener hinzufügen, um das Menü zu schließen, wenn außerhalb des Menüs geklickt wird
if (shouldAddEventListener()) {
    document.getElementById('pageOverlay').addEventListener('click', hideMenu);
}

/**
 * This function is used to store the information wheter a guest user is logged in or not into the local storage.
 * @param {boolean} yesOrNo This variable is either filled with "true" or "false".
 */
function handleGuestUser(trueOrFalse) {
    guestUserActive = trueOrFalse;
    localStorage.setItem('guestUserActive', JSON.stringify(guestUserActive));
}

/**
 * This function is used to proof if the current contact is logged in. In case the contact is logged in, "(You)" is added to his*her name in the contact list.
 * @param {object} contactName This is the name of the current contact.
 */
function proofIfContactIsLoggedIn(name) {
    if (name === loggedInUser) {
        return ' (You)';
    } else {
        return ''; 
        // TODO brauchen wir das else statement?
    }
}