
// ANCHOR load Tasks
function callAddCardsWithFilteredArrays() {
    addCardsToBoards('toDoColumn', todoTasks, 'To do');
    addCardsToBoards('inProgressColumn', progressTasks, 'In progress');
    addCardsToBoards('feedbackColumn', feedbackTasks, 'Await feedback');
    addCardsToBoards('doneColumn', doneTasks, 'Done');
    addContactLabels();
    addSubTaskProgressToCards();
}


function addCardsToBoards(columnID, filterArray, stringForEmptyColumn) {
    let element = document.getElementById(columnID);
    element.innerHTML = '';
    if (filterArray.length == 0) {
        element.innerHTML = boardPlaceholderHTML(stringForEmptyColumn);
    } else {
        for (let i = 0; i < filterArray.length; i++) {
            element.innerHTML += taskCardHTML(filterArray[i].id, filterArray[i].type, filterArray[i].title, filterArray[i].description, prioIcons[filterArray[i].prio]); 
        }
    }
}


function addContactLabels() {
    for (let i = 0; i < taskArray.length; i++) {
        let max = getLabelMaximum(taskArray[i].assigned)
        for (let j = 0; j < max; j++) {
            let initials = getInitials(taskArray[i].assigned[j]);
            let container = document.getElementById(taskArray[i].id).children[3].children[0];
            if (j == 0) {
                container.innerHTML += addAssignHTML(initials); 
            } else {
                container.innerHTML += addAssignWithOverlapHTML(initials, j);
            }
        }
    }
}


function getLabelMaximum(contacts) {
    if (contacts.length >= 3) {
        return 3;
    } else {
        return contacts.length;
    }
}


function addSubTaskProgressToCards() {
    for (let i = 0; i < taskArray.length; i++) {
        let pbar = document.getElementById(taskArray[i].id).children[2].children[0].children[0];
        let label = document.getElementById(taskArray[i].id).children[2].children[1];
        let done = taskArray[i].subTaskStatus.filter(s => s == true);
        label.innerHTML = /*html*/`${done.length}/${taskArray[i].subTask.length} Subtasks`;
        pbar.style.width = ((done.length / taskArray[i].subTask.length) * 100) +'%'; 
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