import { urlConstants } from "./constants.js"

export const getHomeURL = () => {
    // return window.location.origin + window.location.pathname.match(/(\/[a-z]*)/gi)[0] + urlConstants.HOME;
    return window.location.origin + urlConstants.HOME;
}