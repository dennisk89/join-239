


let taskObject = [
    {
        id: 1,
        type: 'assets\img\board-card-label-tt.svg',
        title: 'Kochwelt css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Homer Simpson', 'Alf'],
        prio: 'Mediium',
        subTasks: {
            status: [true, false],
            subTask: ['Link style.css in index.html.', 'Write a display flex class.']
        },
        taskStatus: 'todo'
    },
    {
        id: 2,
        type: 'assets\img\board-card-label-us.svg',
        title: 'Sakura css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Lisa Simpson', 'Alf'],
        prio: 'High',
        subTasks: {
            status: [true, false],
            subTask: ['Link style.css in index.html.', 'Write a display flex class.']
        },
        taskStatus: 'progress' //progress, feedback, done
    },
    {
        id: 3,
        type: 'assets\img\board-card-label-us.svg',
        title: 'Burger css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Marge Simpson', 'Alf', 'Max Mustermann'],
        prio: 'High',
        subTasks: {
            status: [true, true],
            subTask: ['Link style.css in index.html.', 'Write a display flex class.']
        },
        taskStatus: 'progress' //progress, feedback, done
    }
]




// ANCHOR Menu funczionality
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