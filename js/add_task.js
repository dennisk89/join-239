function setPrioBtn(id, cssClass, iconPath, prio) {
    currentTaskPrio = prio;
    ['prioUrgent', 'prioMedium', 'prioLow'].forEach(idInArray => {
        document.getElementById(idInArray).classList.remove('low-selected', 'medium-selected', 'urgent-selected');
        setPrioBtnStandardIcon();
    });
    document.getElementById(id).classList.add(cssClass);
    document.getElementById(id).children[1].src = iconPath
}


function setPrioBtnStandardIcon() {
    document.getElementById('prioUrgent').children[1].src = './assets/img/priority-urgent.svg';
    document.getElementById('prioMedium').children[1].src = './assets/img/priority-medium.svg';
    document.getElementById('prioLow').children[1].src = './assets/img/priority-low.svg';
}