var ipcRenderer = require('electron').ipcRenderer;

document.addEventListener("mouseover", hideColumns);
document.addEventListener('DOMContentLoaded', domContentLoaded);

function domContentLoaded() {
    customScrollbar();
    darkMode();
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function darkMode() {
    if (document.URL.slice(0, 23).toLowerCase() == "https://www.youtube.com") {
        let darkModeToggle = getElementByXpath("//*[@id='caption-container']/paper-toggle-button");
        if (!darkModeToggle.checked || darkModeToggle.checked == null)
            darkModeToggle.click();
    }
}

function hideColumns() {
    if (document.URL.slice(0, 32).toLowerCase() == "https://www.youtube.com/watch?v=") {
        document.getElementById("columns").children[1].style.display = 'none';
        document.getElementById("comments").style.display = 'none';
    }
}

function customScrollbar() {
    
}