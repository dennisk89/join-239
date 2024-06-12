
// ANCHOR load Tasks





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