const { remote } = require("electron");
var win = remote.BrowserWindow.getFocusedWindow();

// Minimize, maximize and exit buttons on titlebar.
var minimize = document.querySelector("#min-btn");
var maximize = document.querySelector("#max-btn");
var quit = document.querySelector("#close-btn");

minimize.addEventListener("click", () => {
    win.minimize();
});

maximize.addEventListener("click", () => {
    if (!win.isMaximized())
        win.maximize();
    else
        win.unmaximize();
});

quit.addEventListener("click", () => {
    win.close();
});