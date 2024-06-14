
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
        id: 0,
        type: 'assets/img/board-card-label-tt.svg',
        title: 'Prepare a css file for the Kochwelt page',
        description: 'We need to link a style.css and wirte some basic utility classes, setup the font etc..',
        dueDate: '2024-7-1',
        assigned: ['Homer Simpson', 'Gordon Shumway'],
        prio: 'medium',
        subTaskStatus: [true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.', 'implement the font'],
        taskStatus: 'todo'
    },
    {
        id: 1,
        type: 'assets/img/board-card-label-us.svg',
        title: 'Ad the menu to "Sakura" page',
        description: 'As a User, I want to see the offered food and the prices.',
        dueDate: '2024-7-1',
        assigned: ['Lisa Simpson', 'Gordon Shumway', 'Bart Simpson', 'Barney Gumble'],
        prio: 'low',
        subTaskStatus: [true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.'],
        taskStatus: 'progress' //progress, feedback, done
    },
    {
        id: 2,
        type: 'assets/img/board-card-label-us.svg',
        title: 'Add imgages to the Burger restaurant page',
        description: 'As a User, I want to see how the Burgers look',
        dueDate: '2024-7-1',
        assigned: ['Marge Simpson', 'Gordon Shumway', 'Max Mustermann'],
        prio: 'urgent',
        subTaskStatus: [true, true, false],
        subTask: ['Link style.css in index.html.', 'Write a display flex class.', 'css button effect'],
        taskStatus: 'progress' //progress, feedback, done
    }
]

let todoTasks = taskArray.filter(t => t.taskStatus == 'todo');
let progressTasks = taskArray.filter(t => t.taskStatus == 'progress');
let feedbackTasks = taskArray.filter(t => t.taskStatus == 'feedback');
let doneTasks = taskArray.filter(t => t.taskStatus == 'done');



