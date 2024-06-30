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

function moveOverlayMenu() {
    let menuAnimation = document.getElementById('userMenu');
    if (menuAnimation.classList.contains('show')) {
        menuAnimation.classList.remove('show');
        menuAnimation.classList.add('hide');
        setTimeout(() => {
            menuAnimation.style.display = 'none';
            menuAnimation.classList.remove('hide');
        }, 1000);
    } else {
        menuAnimation.style.display = 'flex'; 
        menuAnimation.classList.add('show');
    }
}