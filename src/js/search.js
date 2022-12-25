import { stringConstants } from "./constants.js";
import { getTasksFromLocalStorage } from "./storage.js";

export const getAllSearchedNotDoneTasks = (searchedTaskPattern) => {
    const notDoneTaskList = getTasksFromLocalStorage(stringConstants.localStorageKey);
    return getAllSearchedTasks(searchedTaskPattern, notDoneTaskList);
}

export const getAllSearchedDoneTasks = (searchedTaskPattern) => {
    const doneTaskList = getTasksFromLocalStorage(stringConstants.localStorageDoneKey);
    return getAllSearchedTasks(searchedTaskPattern, doneTaskList);
}

const getAllSearchedTasks = (searchedTaskPattern, taskList) => {
    const searchedTasks = [];

    for (const task of taskList) {
        if (task.value.includes(searchedTaskPattern)) {
            searchedTasks.push(task);
        }
    }

    return searchedTasks;
}
