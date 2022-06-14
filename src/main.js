const path = require('path');
require('dotenv').config();

const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    redizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      nativeWindowOpen: true,
    },
  });
  win.loadURL(process.env.CLIENT_URL);
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
