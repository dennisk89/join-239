async function initSummary(){
    await initJoin();
    showTodosCount()
    showDoneTasksCount()
    showUrgentTasksCount()
}

function showTodosCount(){
    let todos = todoTasks.length;
    document.getElementById('todos').innerHTML = todos;
}

function showDoneTasksCount(){
    let doneTasksCount = doneTasks.length;
    document.getElementById('doneTasks').innerHTML = doneTasksCount;
}

function showUrgentTasksCount(){
    let urgentTasksCount = urgentTasks.length;
    document.getElementById('urgentTasks').innerHTML = urgentTasksCount;
}