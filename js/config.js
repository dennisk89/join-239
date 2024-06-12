class Task {
    constructor(id, type, title, description, dueDate, assigned, prio, status, subTask, taskStatus) {
        this.id = id,
        this.type = type,
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.assigned = assigned,
        this.prio = prio,
        this.status = status,
        this.subTask = subTask,
        this.taskStatus = taskStatus
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




let taskArray = [
    {
        id: 1,
        type: 'assets\img\board-card-label-tt.svg',
        title: 'Kochwelt css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Homer Simpson', 'Gordon Shumway'],
        prio: 'Mediium',
        subTaskStatus: [true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.'],
        taskStatus: 'todo'
    },
    {
        id: 2,
        type: 'assets\img\board-card-label-us.svg',
        title: 'Sakura css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Lisa Simpson', 'Gordon Shumway'],
        prio: 'High',
        subTaskStatus: [true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.'],
        taskStatus: 'progress' //progress, feedback, done
    },
    {
        id: 3,
        type: 'assets\img\board-card-label-us.svg',
        title: 'Burger css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Marge Simpson', 'Gordon Shumway', 'Max Mustermann'],
        prio: 'High',
        subTaskStatus: [true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.'],
        taskStatus: 'progress' //progress, feedback, done
    }
]
