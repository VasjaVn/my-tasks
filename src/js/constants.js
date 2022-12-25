export const urlConstants = {
    // HOME: "/index.html"
    HOME: "/my-tasks/"
}

export const getTaskTemplate = (idSection, value, id) => {
    return `<div class="task plainTask" id="${id}">
                <div class="taskName">
                    <div class="radio leftElement"><img` + addClassDoneIfNeeds(idSection) + `src="src/images/check.png" width="15" id="checkImg" /></div>
                    <span class="taskTitle">${value}</span>
                </div>
            </div>`;
}

const addClassDoneIfNeeds = (idSection) => {
    if (idSection === 'doneTaskList') {
        return ' class="done" ';
    } else {
        return ' ';
    }
}

export const stringConstants = {
    localStorageKey: 'tasks',
    localStorageDoneKey: 'doneTasks'
}

export const storageTemplate = JSON.stringify({taskList: []});
