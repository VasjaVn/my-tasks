import { getTaskTemplate, stringConstants } from "./constants.js";
import { getAllSearchedNotDoneTasks, getAllSearchedDoneTasks } from "./search.js";
import { addTaskToLocalStorage, getTasksFromLocalStorage, removeTaskFromLocaleStorageByIndex, getTaskFromLocalStorageById } from "./storage.js";

export const initialUISetup = () => {
    document.getElementById('search').addEventListener('mouseover', () => addClassWithTimeout('searchLabel', 'hovered', 500));
    document.getElementById('search').addEventListener('mouseout', () => removeClassWithTimeout('searchLabel', 'hovered', 500));
    document.getElementById('search').addEventListener('keyup', onSearchTask);
    document.getElementById('addTaskInput').addEventListener('keyup', (event) => validateField(event));
    document.getElementById('addTaskButton').addEventListener('click', addNewTask);
    restoreTasks('taskList', stringConstants.localStorageKey);  
    radioHandlersSetup();
    restoreTasks('doneTaskList', stringConstants.localStorageDoneKey);  
}

const addClassWithTimeout = (id, className, timeout) => {
    setTimeout(() => {
        document.getElementById(id).classList.add(className);
    }, timeout);
}

const addClassWithoutTimeout = (id, className) => {
    document.getElementById(id).classList.add(className);
}

const removeClassWithTimeout = (id, className, timeout) => {
    setTimeout(() => {
        document.getElementById(id).classList.remove(className);
    }, timeout);
}

const removeClassWithoutTimeout = (id, className) => {
    document.getElementById(id).classList.remove(className);
}

const validateField = (event) => {
    if (event.target.value.length > 0) {
        enableAddTaskButton();
    } else {
        disableAddTaskButton();
    }

    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewTask();
    }
}

const enableAddTaskButton = () => {
    const button = document.getElementById('addTaskButton');
    addClassWithoutTimeout('addTaskButton', 'valid');
    button.removeAttribute('disabled');
}

const disableAddTaskButton = () => {
    const button = document.getElementById('addTaskButton');
    removeClassWithoutTimeout('addTaskButton', 'valid');
    button.setAttribute('disabled', '');
}

const addNewTask = () => {
    const inputElement = document.getElementById('addTaskInput');
    const taskWrapper = document.createElement('div');
    const id = Math.random(1, 100);
    taskWrapper.innerHTML = getTaskTemplate('taskList', inputElement.value, id).trim();
    document.getElementById('taskList').append(taskWrapper.firstChild);
    addTaskToLocalStorage({id: id, value: inputElement.value}, stringConstants.localStorageKey);
    inputElement.value = '';
    disableAddTaskButton();
    document.getElementById(id).addEventListener('click', (event) => onRadioClick(event)); 
}

const changeTaskStatus = (id) => {
    const taskElement = document.getElementById(id);
    taskElement.remove();
}

const onRadioClick = (event) => {
    const taskElement = event.target.closest('.task.plainTask');
    if (taskElement) {
        const id = taskElement.getAttribute('id');
        changeTaskStatus(id);
        event.target.classList.add('done');
        document.getElementById('doneTaskList').append(taskElement);
        moveTaskToDoneListInLocaleStorageById(id);
    }
}

const radioHandlersSetup = () => {
    const radioes = document.getElementsByClassName('radio');
    for (const radio of radioes) {
        radio.removeEventListener('click', (event) => onRadioClick(event));
        radio.addEventListener('click', (event) => onRadioClick(event));
    }
}

const restoreTasks = (element, key) => {
    const taskList = getTasksFromLocalStorage(key);
    const taskListTemplates = taskList.map((task) => getTaskTemplate(element, task.value, task.id).trim());
    const documentFragment = document.createDocumentFragment();
    const taskWrapper = document.createElement('div');

    for (const taskTemplate of taskListTemplates) {
        taskWrapper.innerHTML = taskTemplate;
        documentFragment.append(taskWrapper.firstChild);
    }

    document.getElementById(element).append(documentFragment);
}

const moveTaskToDoneListInLocaleStorageById = (id) => {
    const taskObj = getTaskFromLocalStorageById(id, stringConstants.localStorageKey);
    if (taskObj) {
        addTaskToLocalStorage(taskObj.task, stringConstants.localStorageDoneKey);
        removeTaskFromLocaleStorageByIndex(taskObj.index, stringConstants.localStorageKey);    
    }
}

const onSearchTask = () => {
    const searchedTaskPattern = document.getElementById('search').value;
    if (searchedTaskPattern.length > 0) {
        clearAllTasks();
        addClassWithoutTimeout('addTask', 'hidden');
        showSearchedNotDoneTasks(searchedTaskPattern);
        showSearchedDoneTasks(searchedTaskPattern);
    } else {
        clearAllTasks();
        removeClassWithoutTimeout('addTask', 'hidden');
        restoreTasks('taskList', stringConstants.localStorageKey);
        radioHandlersSetup();
        restoreTasks('doneTaskList', stringConstants.localStorageDoneKey); 
    }
}

const showSearchedNotDoneTasks = (searchedTaskPattern) => {
    const searchedNotDoneTasks = getAllSearchedNotDoneTasks(searchedTaskPattern);

    if (searchedNotDoneTasks.length > 0) {
        const taskListTemplates = searchedNotDoneTasks.map((task) => getTaskTemplate('taskList', task.value, task.id).trim());
        const documentFragment = document.createDocumentFragment();
        const taskWrapper = document.createElement('div');
    
        for (const taskTemplate of taskListTemplates) {
            taskWrapper.innerHTML = taskTemplate;
            documentFragment.append(taskWrapper.firstChild);
        }
    
        document.getElementById('taskList').append(documentFragment);
    }
}

const showSearchedDoneTasks = (searchedTaskPattern) => {
    const searchedDoneTasks = getAllSearchedDoneTasks(searchedTaskPattern);

    if (searchedDoneTasks.length > 0) {
        const taskListTemplates = searchedDoneTasks.map((task) => getTaskTemplate('doneTaskList', task.value, task.id).trim());
        const documentFragment = document.createDocumentFragment();
        const taskWrapper = document.createElement('div');
    
        for (const taskTemplate of taskListTemplates) {
            taskWrapper.innerHTML = taskTemplate;
            documentFragment.append(taskWrapper.firstChild);
        }
    
        document.getElementById('doneTaskList').append(documentFragment);
    }
}

const clearAllTasks = () => {
    const elements = document.querySelectorAll('.task.plainTask');
    for (const element of elements) {
        element.remove();
    }
}
