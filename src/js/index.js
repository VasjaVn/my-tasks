import { initialLocalStorageSetup } from "./storage.js";
import { initialUISetup } from "./ui.js";
import { getHomeURL } from "./utils.js"

window.onload = () => {
    initialUISetup();
    initialLocalStorageSetup();
    document.querySelector('#homeLink').addEventListener('click', navigateHome);
}

export const navigateHome = () => {
    window.location = getHomeURL();
}
