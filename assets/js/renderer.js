const checkInternetConnected = require('check-internet-connected');


let ById = function (id) {
    return document.getElementById(id);
}

// Declaring buttons, inputs and others to variable.
const back = ById('back'),
    forward = ById('forward'),
    refresh = ById('refresh'),
    titlebar = ById('title-bar'),
    offlineDiv = ById('offline'),
    omni = ById('url'),
    errName = ById('errName'),
    view = ById('webview');


// reload, back and forward buttons to webview in titlebar.
function reloadView() {
    view.reload();
}

function backView() {
    view.goBack();
}

function forwardView() {
    view.goForward();
}

// After user input check URL is valid and modify it
function updateURL(event) {
    if (event.keyCode === 13) {
        omni.blur();
        let val = omni.value;
        let https = val.slice(0, 8).toLowerCase();
        let http = val.slice(0, 7).toLowerCase();
        if (https === 'https://') { }
        else if (http === 'http://') { }
        else {
            if (isValidUrl(val))
                val = 'http://' + val;
            else
                val = 'https://duckduckgo.com/?q=' + val; // If input is not the URL, forward to duckduckgo search.
        }

        try {
            view.loadURL(val);
        } catch (e) {
            console.log(e);
        }
    }
}

// Update url bar in every forwarding, reloading etc.
function updateNav(event) {
    omni.value = view.src;
    offlineChecked();
}

// Check isValid or not
function isValidUrl(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return res != null;
}

// Hide titlebar if user entered to fullscreen.
function enterHTMLFullScreen() {
    titlebar.style.display = 'none'
    view.style.marginTop = '0px';
    view.style.height = '100%';
}

// Show titlebar if user left the fullscreen.
function leaveHTMLFullScreen() {
    titlebar.style.display = 'block'
    view.style.marginTop = '50px';
    view.style.height = 'calc(100% - 50px)';
}

function offlineChecked() {
    const config = {
        timeout: 5000, //timeout connecting to each try (default 5000)
        retries: 3,//number of retries to do before failing (default 5)
        domain: 'duckduckgo.com'//the domain to check DNS record of
    }

    // Modify the window if internet connected or not.
    checkInternetConnected(config).then(enterOnlineMode).catch(enterOfflineMode);
}

function enterOnlineMode() {
    offlineDiv.style.display = 'none';
    titlebar.style.backgroundColor = '#252525';
    omni.style.backgroundColor = '#505050';
    view.style.display = 'inline-flex';
}

function enterOfflineMode(err) {
    offlineDiv.style.display = 'block';
    titlebar.style.backgroundColor = 'darkred';
    omni.style.backgroundColor = 'red';
    view.style.display = 'none';
    errName.innerText = err;
}

// Adding event listeners to elements.
refresh.addEventListener('click', reloadView);
back.addEventListener('click', backView);
forward.addEventListener('click', forwardView);
omni.addEventListener('keydown', updateURL);
view.addEventListener('page-title-updated', updateNav);
view.addEventListener('did-finish-load', updateNav);
view.addEventListener('did-start-loading', updateNav);
view.addEventListener('did-navigate-in-page', updateNav);
view.addEventListener('enter-html-full-screen', enterHTMLFullScreen);
view.addEventListener('leave-html-full-screen', leaveHTMLFullScreen);

view.addEventListener('did-fail-load', function (err) {
    let errorCode = err['errorCode'];
    let errDescription = err['errorDescription'];
});

