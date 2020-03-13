const { app, BrowserWindow } = require('electron')

/*

TODO: Add delete history option

Windows:
C:\Users\<user>\AppData\Roaming\<yourAppName>\Cache

Linux:
/home/<user>/.config/<yourAppName>/Cache

OS X:
/Users/<user>/Library/Application Support/<yourAppName>/Cache

*/

function createWindow () {
  const win = new BrowserWindow({
    minWidth: 500,
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })

  win.hide();

  // Show window after load UI.
  win.loadFile('index.html').then(() => {
    win.show();
  });

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
