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
let tempSubtasks = [];
let tempAssignees = [];
let tempSubtasksStatus = [];
let loggedInUser;

function resetGlobalTaskVariables() {
    tempSubtasks = [];
    tempSubtasksStatus = [];
    tempAssignees = [];
    currentTaskPrio = 'medium'
}

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

async function getData(url) {
    let response = await fetch(url + ".json").catch(errorFunction);
    console.log(response.status);
    return await response.json();
}

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

function errorFunction() {
    console.error('Fehler aufgetreten');
}


/* ANCHOR Header */

/**
 * This function is used to show the right user icon on the header for either guest user or logged in user.
 */
function showUserIcon() {
    if (typeof loggedInUser === 'undefined' || loggedInUser === null) {
        showGuestUserIcon();
    } else {
        updateUserIcon(loggedInUser);
    }
}

/**
 * This function is used to show the initials of the currently logged in user in the header's user icon.
 * @param {*} name This is the name of the currently logged in user.
 */
function updateUserIcon(name) {
    const initials = name.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');

    document.getElementById('userIcon').innerText = initials;    
}

/**
 * This function is used to show the header's icon for guest user.
 */
function showGuestUserIcon() {
    let userIcon = document.getElementById('userIcon');
    userIcon.innerHTML = 'G';
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
    const pages = ['/summary.html', '/addTask.html', '/contacts.html', 'board.html'];
    return pages.includes(window.location.pathname);
}

// Event-Listener hinzufügen, um das Menü zu schließen, wenn außerhalb des Menüs geklickt wird
if (shouldAddEventListener()) {
    document.getElementById('pageOverlay').addEventListener('click', hideMenu);
}