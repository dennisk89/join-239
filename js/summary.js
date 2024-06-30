async function initSummary() {
    await initJoin();
    showTodosCount();
    showDoneTasksCount();
    showUrgentTasksCount();
    showTasksInBoardCount();
    showTasksInProgressCount();
    showTasksAwaitingFeedbackCount();
    findEarliestDate();
    getUserNameByLoggedInEmail(loggedInEmail);
}

function showTodosCount() {
    let todos = todoTasks.length;
    document.getElementById('todos').innerHTML = todos;
}

function showDoneTasksCount() {
    let doneTasksCount = doneTasks.length;
    document.getElementById('doneTasks').innerHTML = doneTasksCount;
}

function showUrgentTasksCount() {
    let urgentTasksCount = urgentTasks.length;
    document.getElementById('urgentTasks').innerHTML = urgentTasksCount;
}

function showTasksInBoardCount() {
    let tasksInBoardCount = taskArray.length;
    document.getElementById('tasksInBoard').innerHTML = tasksInBoardCount;
}

function showTasksInProgressCount() {
    let showTasksInProgressCount = progressTasks.length;
    document.getElementById('tasksInProgress').innerHTML = showTasksInProgressCount;
}

function showTasksAwaitingFeedbackCount() {
    let feedbackTasksCount = feedbackTasks.length;
    document.getElementById('tasksAwaitingFeedback').innerHTML = feedbackTasksCount;
}

function findEarliestDate() {
    let earliestDueDate = null;
    for (let task of urgentTasks) {
        if (!earliestDueDate || new Date(task.dueDate) < new Date(earliestDueDate)) {
            earliestDueDate = task.dueDate;
        }
    }
    let formattedDueDate = new Date(earliestDueDate).toLocaleDateString('en-US', {
        month: 'long', 
        day: 'numeric',
        year: 'numeric' 
    });
    document.getElementById('dueDate').innerHTML = formattedDueDate;
}

// function getUserNameByLoggedInEmail(loggedInEmail) {
//     const user = usersArray.find(user => user.email === loggedInEmail);
//     return user ? user.name : null;
// }

