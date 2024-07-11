// ANCHOR load Task cards in board

/**
 * Initializes the board by fetching and displaying tasks in their respective columns.
 * 
 * This async function performs the following steps:
 * 1. Calls the `initJoin` function to fetch and prepare task data.
 * 2. Adds task cards to the 'To do', 'In progress', 'Await feedback', and 'Done' columns.
 * 3. Adds additional information to the task cards.
 * 4. Closes the task overlay.
 * 5. Resets the subtask input fields.
 * 
 * @async
 * @function initBoard
 * @returns {Promise<void>} A promise that resolves when the board initialization is complete.
 */
async function initBoard() {
    await initJoin();
    checkForNewUsersAndAddToContacts();
    addCardsToBoards('toDoColumn', todoTasks, 'To do');
    addCardsToBoards('inProgressColumn', progressTasks, 'In progress');
    addCardsToBoards('feedbackColumn', feedbackTasks, 'Await feedback');
    addCardsToBoards('doneColumn', doneTasks, 'Done');
    addInfosToCards(taskArray);
    closeTask('addTaskOverlay');
    resetSubtaskInput();
}


/**
 * Adds task cards to a specified board column based on a filtered array of tasks.
 * 
 * This function performs the following steps:
 * 1. Clears the content of the specified column element.
 * 2. If the filtered array is empty, it displays a placeholder message.
 * 3. If the filtered array is not empty, it iterates through the array and adds task cards to the column.
 * 
 * @function addCardsToBoards
 * @param {string} columnID - The ID of the board column element where the cards will be added.
 * @param {Array} filterArray - The array of filtered task objects to be added to the column.
 * @param {string} stringForEmptyColumn - The placeholder message to display if the column is empty.
 */
function addCardsToBoards(columnID, filterArray, stringForEmptyColumn) {
    let element = document.getElementById(columnID);
    element.innerHTML = '';
    if (filterArray.length == 0) {
        element.innerHTML = boardPlaceholderHTML(stringForEmptyColumn);
    } else {
        for (let i = 0; i < filterArray.length; i++) {
            element.innerHTML += taskCardHTML(filterArray[i].id, filterArray[i].type, filterArray[i].title, shortText(filterArray[i].description), prioIcons[filterArray[i].prio], filterArray[i].taskStatus);
        }
    }
}


/**
 * This function shortens a text to the last space before the 55. character. 
 * 
 *  @param {string} text Description of a task
 */
function shortText(text) {
    if (text.length > 55) {
        let shortText = text.substring(0, 55)
        return shortText.substring(0, shortText.lastIndexOf(' ')) + '...'
    } else {
        return text
    }
}


/**
 * This function starts a loop that calls the functions that add assignees and progress information to the task 
 * 
 *  @param {array} taskArray array with all tasks or filtered array with tasks
 */
function addInfosToCards(taskArray) {
    for (let i = 0; i < taskArray.length; i++) {
        taskArray[i].assigned ? addContactLabelsToCards(taskArray, i) : '';
        taskArray[i].subTask ? addSubTaskProgressToCards(taskArray, i) : document.getElementById(taskArray[i].id).children[2].style.display = 'none';
    }
}


/**
 * This function adds the maximum of 5 contact batches to the task cards. The rest will be indicated by a number batch.
 * 
 *  @param {array} taskArray array with all tasks or filtered array with tasks
 *  @param {array} i loop index
 */
function addContactLabelsToCards(taskArray, i) {
    let container = document.getElementById(taskArray[i].id).children[3].children[0];
    container.innerHTML = '';
    let validAssignees = pushTaskAssigneeInfosToArray(taskArray[i]);
    let max = getLabelMaximum(validAssignees);
    for (let j = 0; j < max; j++) {
        if (j === 5 && validAssignees.length > 6) {
            container.innerHTML += addAssignWithOverlapHTML(getRest(validAssignees), 'grey', j);
        } else {
            defineContactIconOverlap(j, validAssignees[j], container);
        }
    }
}


/**
 * Defines the contact icon overlap for a given assignee and appends the HTML to the container.
 * This function performs the following steps:
 * 1. If the index `j` is 0, it appends the HTML for a non-overlapping contact icon.
 * 2. If the index `j` is not 0, it appends the HTML for an overlapping contact icon.
 * 
 * @function defineContactIconOverlap
 * @param {number} j - The index of the assignee in the list.
 * @param {Object} assignee - The assignee object containing details about the assignee.
 * @param {string} assignee.initials - The initials of the assignee.
 * @param {string} assignee.color - The color associated with the assignee.
 * @param {HTMLElement} container - The container element to which the HTML will be appended.
 */
function defineContactIconOverlap(j, assignee, container) {
    if (j == 0) {
        container.innerHTML += addAssignHTML(assignee.initials, assignee.color);
    } else {
        container.innerHTML += addAssignWithOverlapHTML(assignee.initials, assignee.color, j);
    }
}


/**
 * Gets the maximum number of labels to be displayed based on the number of contacts.
 * 
 * This function returns the maximum number of labels as follows:
 * 1. If the length of the `contacts` array is 6 or more, it returns 6.
 * 2. Otherwise, it returns the length of the `contacts` array.
 * 
 * @function getLabelMaximum
 * @param {Array} contacts - The array of contacts.
 * @returns {number} The maximum number of labels to be displayed.
 */
function getLabelMaximum(contacts) {
    if (contacts.length >= 6) {
        return 6;
    } else {
        return contacts.length;
    }
}


/**
 * Calculates the number of additional assignees beyond a specified limit and returns it as a string.
 * 
 * This function calculates the number of additional valid assignees beyond the first 5 and returns 
 * this number prefixed with a '+' sign as a string.
 * 
 * @function getRest
 * @param {Array} validAssignees - The array of valid assignees.
 * @returns {string} The number of additional assignees beyond the first 5, prefixed with a '+' sign.
 */
function getRest(validAssignees) {
    let rest = validAssignees.length - 5;
    return '+' + String(rest);
}


/**
 * Updates the progress bar and label for subtasks in task cards.
 * 
 * This function performs the following steps:
 * 1. Retrieves the progress bar and label elements for the specified task card.
 * 2. Counts the number of completed subtasks.
 * 3. Updates the label to show the number of completed subtasks out of the total subtasks.
 * 4. Updates the width of the progress bar to reflect the percentage of completed subtasks.
 * 
 * @function addSubTaskProgressToCards
 * @param {Array} taskArray - The array of task objects.
 * @param {number} i - The index of the task in the task array.
 */
function addSubTaskProgressToCards(taskArray, i) {
    let pbar = document.getElementById(taskArray[i].id).children[2].children[0].children[0];
    let label = document.getElementById(taskArray[i].id).children[2].children[1];
    let done = taskArray[i].subTaskStatus.filter(s => s == true);
    label.innerHTML = /*html*/`${done.length}/${taskArray[i].subTask.length} Subtasks`;
    pbar.style.width = ((done.length / taskArray[i].subTask.length) * 100) + '%';
}


/**
 * Closes a task overlay by hiding it with an animation and resetting global task variables.
 * 
 * This function performs the following steps:
 * 1. Removes the 'show' class and adds the 'hide' class to the task overlay element to start the hiding animation.
 * 2. After a delay, it resets global task variables, hides the task overlay element, and removes the 'hide' class.
 * 
 * @function closeTask
 * @param {string} id - The ID of the task overlay element to be closed.
 */
function closeTask(id) {
    let taskOverlay = document.getElementById(id);
    taskOverlay.classList.remove('show');
    taskOverlay.classList.add('hide');
    setTimeout(() => {
        resetGlobalTaskVariables();
        taskOverlay.style.display = 'none';
        taskOverlay.classList.remove('hide');
    }, 125);
}


// ANCHOR task search

/**
 * Checks the search input and filters tasks based on the search string.
 * 
 * This function performs the following steps:
 * 1. Retrieves the search string from the search input element.
 * 2. If the search string is not empty, it filters tasks by the search string.
 * 3. If the search string is empty, it hides the 'no task found' message and initializes the board.
 * 
 * @function checkSearch
 */
function checkSearch() {
    let searchString = document.getElementById('taskSearch').children[0].value;
    if (searchString.length > 0) {
        filterTaskBySearch(searchString)
    } else {
        document.getElementById('noTaskFound').style.display = 'none';
        initBoard();
    }
}


/**
 * Filters tasks based on a search string and displays the results.
 * 
 * This function performs the following steps:
 * 1. Iterates through the `taskArray` to find tasks where the title or description contains the search string (case-insensitive).
 * 2. Adds matching tasks to the results array.
 * 3. Displays the filtered tasks by calling the `showResults` function.
 * 
 * @function filterTaskBySearch
 * @param {string} searchString - The search string used to filter tasks.
 */
function filterTaskBySearch(searchString) {
    let results = [];
    taskArray.forEach(t => {
        if (t.title.toUpperCase().indexOf(searchString.toUpperCase()) > -1 || t.description.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
            results.push(t);
        }
    });
    showResults(results)
}


/**
 * Displays the filtered task results in their respective board columns.
 * 
 * This function performs the following steps:
 * 1. Adds task cards to the 'To do', 'In progress', 'Await feedback', and 'Done' columns based on their status in the filtered results.
 * 2. Adds additional information to the displayed task cards.
 * 3. Hides the 'no task found' message.
 * 4. If no tasks are found in the results, displays the 'no task found' message.
 * 
 * @function showResults
 * @param {Array} results - The array of filtered task objects to be displayed.
 */

function showResults(results) {
    addCardsToBoards('toDoColumn', results.filter(t => t.taskStatus == 'todo'), 'To do');
    addCardsToBoards('inProgressColumn', results.filter(t => t.taskStatus == 'progress'), 'In progress');
    addCardsToBoards('feedbackColumn', results.filter(t => t.taskStatus == 'feedback'), 'Await feedback');
    addCardsToBoards('doneColumn', results.filter(t => t.taskStatus == 'done'), 'Done');
    addInfosToCards(results);
    document.getElementById('noTaskFound').style.display = 'none';
    if (results.length == 0) {
        document.getElementById('noTaskFound').style.display = 'flex';
    }
}


document.getElementById('taskSearch').addEventListener('keyup', checkSearch);


// ANCHOR open Task details

/**
 * Opens and displays the details of a task in an overlay.
 * 
 * This function performs the following steps:
 * 1. Retrieves the task details by its ID using `getTaskById`.
 * 2. Stores the subtasks of the retrieved task in a temporary variable.
 * 3. Displays the task overlay by setting its `display` style to 'flex'.
 * 4. Populates the overlay with the task details using the `taskHTML` function.
 * 5. If the task has assignees, renders them using the `renderAssignees` function.
 * 6. If the task has subtasks, renders them using the `renderSubTasks` function.
 * 7. Adds the 'show' class to the overlay to trigger any associated animations or styles.
 * 
 * @function openTasks
 * @param {string} id - The ID of the task to be opened.
 */
function openTasks(id) {
    let task = getTaskById(id);
    tempSubtasks = task.subTask;
    let taskOverlay = document.getElementById('taskOverlay');
    taskOverlay.style.display = 'flex';
    taskOverlay.innerHTML = taskHTML(task.id, task.type, task.title, task.description, task.dueDate, prioIcons[task.prio]);
    if (task.assigned) {
        renderAssignees(task)
    }
    if (task.subTask) {
        renderSubTasks(task)
    }
    taskOverlay.classList.add('show');
}


/**
 * Renders the list of assignees for a given task and updates the task assignment section in the UI.
 * 
 * This function performs the following steps:
 * 1. Retrieves assignee information for the task using the `pushTaskAssigneeInfosToArray` function.
 * 2. Iterates through the retrieved assignees and checks if they are valid.
 * 3. For each valid assignee, it determines if the assignee is currently logged in using `proofIfContactIsLoggedIn`.
 * 4. Updates the HTML of the task assignment section by appending the HTML for each assignee using the `taskAssignHTML` function.
 * 
 * @function renderAssignees
 * @param {Object} task - The task object containing task assignee information.
 */
function renderAssignees(task) {
    let taskAssignees = pushTaskAssigneeInfosToArray(task);
    for (let i = 0; i < taskAssignees.length; i++) {
        if (taskAssignees[i] != 'not found') {
            let taskAssigneeName = taskAssignees[i].name;
            let assigneeIsLoggedIn = proofIfContactIsLoggedIn(taskAssigneeName);
            document.getElementById('taskAssign').innerHTML += taskAssignHTML(taskAssignees[i].color, taskAssignees[i].initials, taskAssignees[i].name, assigneeIsLoggedIn);
        }
    }
}


/**
 * Renders the subtasks of a given task in the task overlay.
 * 
 * This function populates the subtask container with HTML elements representing each subtask.
 * It checks the status of each subtask and uses different HTML templates for completed and incomplete subtasks.
 * 
 * @function renderSubTasks
 * @param {Object} task - The task object containing subtasks to be rendered.
 */
function renderSubTasks(task) {
    let subtaskContainer = document.getElementById('taskOverlaySubtasks');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < task.subTask.length; i++) {
        if (task.subTaskStatus[i]) {
            subtaskContainer.innerHTML += taskSubTaskDoneHTML(i, task.subTask[i]);
        } else {
            subtaskContainer.innerHTML += taskSubTaskHTML(i, task.subTask[i]);
        }
    }
}


/**
 * Retrieves a task object by its ID.
 * 
 * This function searches the `taskArray` for a task with the specified ID and returns the task object.
 * 
 * @function getTaskById
 * @param {string} id - The ID of the task to retrieve.
 * @returns {Object} The task object with the specified ID.
 */
function getTaskById(id) {
    return taskArray[taskArray.findIndex(t => t.id === id)];
}


// ANCHOR delete Task
/**
 * Deletes a task by its ID and updates the task data on the server.
 * 
 * This asynchronous function performs the following steps:
 * 1. Finds and removes the task with the specified ID from the `taskArray`.
 * 2. Updates the task data on the server by calling `putData`.
 * 3. Closes the task overlay.
 * 4. Re-initializes the board to reflect the updated task list.
 * 
 * @async
 * @function deleteTask
 * @param {string} id - The ID of the task to delete.
 */
async function deleteTask(id) {
    taskArray.splice(taskArray.findIndex(t => t.id === id), 1);
    await putData(endpointTasks, taskArray);
    showTaskDeletedMessage()
    closeTask('taskOverlay');
    initBoard();
}


// SECTION add task
function openAddTaskOverlay() {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    resetValuesInAddOverlay();
    addTaskOverlay.style.display = 'flex';
    addTaskOverlay.classList.add('show');
}


function resetValuesInAddOverlay() {
    document.getElementById('catSelectValue').dataset.tasktype = ''; 
    document.getElementById('catSelectValue').innerHTML = 'Select task Category'
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = ''; 
    document.getElementById('dateInput').value = '';
    setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium');
}


function handleAddTask(taskStatus = 'todo') {
    if (taskStatus != 'todo') {
        sessionStorage.setItem("preSetTaskStatus", JSON.stringify(taskStatus));
    } 
    window.innerWidth > 1200 ? openAddTaskOverlay() : window.location.href = 'addTask.html';
}


// ANCHOR eventListener add tasks
document.getElementById('boardAddBtn').addEventListener('click', () => handleAddTask('todo'));


document.getElementById('addTaskInTodo').addEventListener('click', () => handleAddTask('todo'));


document.getElementById('addTaskInProgress').addEventListener('click', () => handleAddTask('progress'));


document.getElementById('addTaskInFeedback').addEventListener('click', () => handleAddTask('feedback'));


/**
 * Adds click event listeners to specified elements to handle closing overlays and resetting inputs.
 * 
 * This code block iterates over an array of element IDs and attaches a click event listener to each element.
 * When an element is clicked, it performs the following actions:
 * 1. Closes the corresponding overlay by calling `closeTask`, using `'addTaskOverlay'` for most elements, and `'taskOverlay'` for the element with ID `'taskOverlay'`.
 * 2. Resets the subtask input by calling `resetSubtaskInput`.
 * 3. Resets global task variables by calling `resetGlobalTaskVariables`.
 * 
 * @function
 */
['closeAddBtn', 'addTaskOverlay', 'taskOverlay', 'cancelAdd'].forEach(id => document.getElementById(id).addEventListener('click', () => {
    id == 'taskOverlay' ? closeTask(id) : closeTask('addTaskOverlay');
    resetSubtaskInput();
    resetGlobalTaskVariables();
}));


// !SECTION

/*ANCHOR - Drag and Drop*/
let currentDraggedElement;


/**
 * Initializes the dragging process by storing the ID of the dragged element.
 * 
 * This function is called when a drag operation starts. It logs the ID of the element being dragged
 * and stores this ID in the `currentDraggedElement` variable.
 * 
 * @function startDragging
 * @param {string} id - The ID of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * Prevents the default handling of the dragover event to allow dropping.
 * 
 * This function is used as an event handler for dragover events. It prevents the default action of the event,
 * which is required to allow dropping elements.
 * 
 * @function allowDrop
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Moves a task to a new status and updates the task data on the server.
 * 
 * This asynchronous function performs the following steps:
 * 1. Highlights the drop area for the task.
 * 2. Updates the status of the task in the `taskArray` based on the `taskStatus` parameter.
 * 3. Sends the updated task data to the server by calling `putData`.
 * 4. Removes the highlight from the drop area.
 * 5. Re-initializes the board to reflect the updated task list.
 * 
 * @async
 * @function moveTo
 * @param {string} id - The ID of the drop area element.
 * @param {string} taskStatus - The new status to assign to the task.
 */
async function moveTo(id, taskStatus) {
    highlight(id);
    taskArray[taskArray.findIndex(t => t.id === currentDraggedElement)].taskStatus = taskStatus;
    await putData(endpointTasks, taskArray);
    removeHighlight(id);
    initBoard();
}


/**
 * Adds a highlight class to the specified element.
 * 
 * This function adds a CSS class to visually highlight the drop area for drag-and-drop operations.
 * 
 * @function highlight
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * Removes the highlight class from the specified element.
 * 
 * This function removes a CSS class that visually highlights the drop area for drag-and-drop operations.
 * 
 * @function removeHighlight
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}