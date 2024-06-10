function openTask() {
    console.log('Task öffnen');
}


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
        taskStatus: 'todo' //progress, feedback, done
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
        taskStatus: 'progrees' //progress, feedback, done
    },
]