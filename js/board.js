
// ANCHOR load Tasks
function callAddCardsByStatus() {
    addCardsToBoards('toDoColumn', todoTasks, 'To do');
    addCardsToBoards('inProgressColumn', progressTasks, 'In progress');
    addCardsToBoards('feedbackColumn', feedbackTasks, 'Await feedback');
    addCardsToBoards('doneColumn', doneTasks, 'Done');
}


function addCardsToBoards(columnID, taskArray, stringForEmptyColumn) {
    let element = document.getElementById(columnID);
    element.innerHTML = ''
    if (taskArray.length == 0) {
        element.innerHTML = boardPlaceholderHTML(stringForEmptyColumn)
    } else {
        for (let i = 0; i < taskArray.length; i++) {
            element.innerHTML += taskCardHTML(taskArray[i].id, taskArray[i].type, taskArray[i].title, taskArray[i].description, prioIcons[taskArray[i].prio]); 
        }
    }
}


function getInitials(name) {
    return String(name[0]).toUpperCase() + String(name[name.indexOf(' ') + 1]).toUpperCase()
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