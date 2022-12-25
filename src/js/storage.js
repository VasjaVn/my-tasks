import { storageTemplate, stringConstants } from "./constants.js";

export const getLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const initialLocalStorageSetup = () => {
    const initialStorage = getLocalStorage(stringConstants.localStorageKey) ;
    if (!initialStorage) {
        localStorage.setItem(stringConstants.localStorageKey, storageTemplate);
        localStorage.setItem(stringConstants.localStorageDoneKey, storageTemplate);
    }
}

export const addTaskToLocalStorage = (task, key) => {
    const taskStorageString = getLocalStorage(key);
    const taskStorage = JSON.parse(taskStorageString);
    taskStorage.taskList.push(task);
    localStorage.setItem(key, JSON.stringify(taskStorage));
}

export const removeTaskFromLocaleStorageByIndex = (taskIndex, key) => {
    const taskStorageString = getLocalStorage(key);
    const taskStorage = JSON.parse(taskStorageString);
    taskStorage.taskList.splice(taskIndex, 1);
    localStorage.setItem(key, JSON.stringify(taskStorage));
}

export const getTasksFromLocalStorage = (key) => {
    const taskListString = getLocalStorage(key);
    if (!taskListString) {
        initialLocalStorageSetup();
    }
    return JSON.parse(taskListString).taskList;
}

export const getTaskFromLocalStorageById = (id, key) => {
    const taskList = JSON.parse(getLocalStorage(key)).taskList;
 
    let index = -1;
    for (const task of taskList) {
        index++;
        if (task.id == id) {
            return {task: task, index: index};
        }
    }
}
