
// ANCHOR load Tasks
function getTasksByStatus() {
    let todos = taskArray.filter(t => t.taskStatus == 'todo');
    let progress = taskArray.filter(t => t.taskStatus == 'progress');
    addCardsToBoards('toDoColumn', todos);
    addCardsToBoards('inProgressColumn', progress);
}

function addCardsToBoards(columnID, taskArray) {
    let element = document.getElementById(columnID);
    element.innerHTML = ''
    for (let i = 0; i < taskArray.length; i++) {
        element.innerHTML += taskCardHTML(taskArray[i].id, taskArray[i].type, taskArray[i].title, taskArray[i].description, prioIcons[taskArray[i].prio]); 
    }
}




function saveTasks() {
    let newTask = new Task(
        taskArray.length + 1, 
        'assets\img\board-card-label-us.svg', 
        'Kochwelt html', 
        'Write html code for Kochwelt',
        '2024-7-1',
        ['Homer Simpson', 'Gordon Shumway'],
        'Urgent',
        [false, false],
        ['Link style.css in index.html.', 'Write all html elements.'],
        'todo'
    );
    taskArray.push(newTask)
}


// ANCHOR Menu functionality
function stopP(event) {
    event.stopPropagation();
}


function openTask() {
    console.log('Task öffnen');
    document.getElementById('taskOverlay').style.display = 'flex';
}

function closeTask() {
    document.getElementById('taskOverlay').style.display = 'none';
}


function checkSubTask(e) {
    let checkbox = document.getElementById(e.target.id);
    if (checkbox.src == './assets/img/checkbox.svg') {
        console.log('check');
        checkbox.src = 'assets/img/checkbox-checked.svg';
    } else {
        console.log('uncheck');
        checkbox.src = 'assets/img/checkbox.svg';
    }
}