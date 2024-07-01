async function initSummary() {
    await initJoin();
    showTodosCount();
    showDoneTasksCount();
    showUrgentTasksCount();
    showTasksInBoardCount();
    showTasksInProgressCount();
    showTasksAwaitingFeedbackCount();
    findEarliestDate();
    showUserIcon();
    showGreeting();
    // getUserNameByLoggedInEmail(loggedInEmail);
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



/**
 * This function is used to show the right greeting for either guest user or logged in user. On mobile devices, the greeting is displayed with timeout before the summary page appears.
 */
function showGreeting() {
    if (typeof loggedInUser === 'undefined' || loggedInUser === null) {
        showGreetingGuestUser();
    } else {
        showGreetingLoggedInUser();
        showUserName(loggedInUser);
    }
    setTimeout(() => {
        let greetUserBg = document.getElementById('greetUserBg');
        greetUserBg.classList.add('d-none');
    }, 1000);
}

/**
 * This function is used to show the name of the currently logged in user on the summary page.
 * @param {string} name This is the name of the currently logged in user.
 */
function showUserName(name) {
    let userNameDesktop = document.getElementById('userNameDesktop');
    userNameDesktop.innerHTML = '';
    userNameDesktop.innerHTML = name;
    let userNameMobile = document.getElementById('userNameMobile');
    userNameMobile.innerHTML = '';
    userNameMobile.innerHTML = name;
}

/**
 * This function is used to show the right greeting for logged in users on the summary page.
 */
function showGreetingLoggedInUser() {
    let greetingDesktop = document.getElementById('greetingDesktop');
    let greetingMobile = document.getElementById('greetingMobile');
    greetingDesktop.innerHTML = '';
    greetingMobile.innerHTML = '';
    greetingDesktop.innerHTML = chooseGreeting() + ',';
    greetingMobile.innerHTML = chooseGreeting() + ',';
}

/**
 * This function is used to show the right greeting for guest users on the summary page.
 */
function showGreetingGuestUser() {
        let greetingDesktop = document.getElementById('greetingDesktop');
        let greetingMobile = document.getElementById('greetingMobile');
        greetingDesktop.innerHTML = '';
        greetingMobile.innerHTML = '';
        greetingDesktop.innerHTML = chooseGreeting() + '!';
        greetingMobile.innerHTML = chooseGreeting() + '!';
}

/**
 * This function is used to check the current hour and choose the greeting based on it.
 */
function chooseGreeting() {
    let d = new Date();
    let h = d.getHours();
    if (h >= 4 && h < 10) {
        return 'Good morning';
    } else if ((h < 4) || (h >= 10 && h < 13)) {
        return  'Hello';
    } else if (h >= 13 && h < 17) {
        return 'Good afternoon';
    } else if (h >= 17) {
        return 'Good evening';
    }
}