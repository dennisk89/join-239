
const prioIcons = {
    'low': 'assets/img/priority-low.svg', 
    'medium': 'assets/img/priority-medium.svg',
    'urgent': 'assets/img/priority-urgent.svg'
}


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


let taskArray = [
    {
        id: 1,
        type: 'assets/img/board-card-label-tt.svg',
        title: 'Kochwelt css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Homer Simpson', 'Gordon Shumway'],
        prio: 'medium',
        subTaskStatus: [true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.'],
        taskStatus: 'todo'
    },
    {
        id: 2,
        type: 'assets/img/board-card-label-us.svg',
        title: 'Sakura css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Lisa Simpson', 'Gordon Shumway', 'Bart Simpson', 'Barney Gumble'],
        prio: 'low',
        subTaskStatus: [true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.'],
        taskStatus: 'progress' //progress, feedback, done
    },
    {
        id: 3,
        type: 'assets/img/board-card-label-us.svg',
        title: 'Burger css',
        description: 'Write a lot of css code.',
        dueDate: '2024-7-1',
        assigned: ['Marge Simpson', 'Gordon Shumway', 'Max Mustermann'],
        prio: 'urgent',
        subTaskStatus: [true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.'],
        taskStatus: 'progress' //progress, feedback, done
    }
]

let todoTasks = taskArray.filter(t => t.taskStatus == 'todo');
let progressTasks = taskArray.filter(t => t.taskStatus == 'progress');
let feedbackTasks = taskArray.filter(t => t.taskStatus == 'feedback');
let doneTasks = taskArray.filter(t => t.taskStatus == 'done');
