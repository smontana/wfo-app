'use strict';
const path = require('path');
const fs = require('fs');
const electron = require('electron');
const app = electron.app;
const config = require('./lib/config');

// jade stuff
const locals = {};
const jade = require('./lib/electron-jade')({pretty: true}, locals);

require('dotenv').load();

let mainWindow;
let mainWindowBounds;
let isQuitting = false;

function createMainWindow() {
  const lastWindowState = config.get('lastWindowState');

  const win = new electron.BrowserWindow({
    show: false,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true
  });

  // NOTE: the URL is enclosed in backticks NOT single quotes
  win.loadURL(`file://${__dirname}/index.jade`);

  return win;
}

app.on('ready', function() {
  mainWindow = createMainWindow();

  const page = mainWindow.webContents;

  page.on('dom-ready', function() {
    page.insertCSS(fs.readFileSync(path.join(__dirname+'/public/stylesheets/photon-kit/css/', 'photon.css'), 'utf8'));
    page.insertCSS(fs.readFileSync(path.join(__dirname+'/public/stylesheets/', 'c3.min.css'), 'utf8'));
    page.insertCSS(fs.readFileSync(path.join(__dirname+'/public/stylesheets/', 'myStyles.css'), 'utf8'));
    mainWindow.show();
  });

  mainWindow.on('close', function() {
    mainWindowBounds = mainWindow.getBounds();
  });

  mainWindow.on('closed', function() {
    app.quit();
  });
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
    console.log(mainWindowBounds);
});

app.on('before-quit', function() {
  isQuitting = true;
  config.set('lastWindowState', {
    width: mainWindowBounds.width,
    height: mainWindowBounds.height,
    x: mainWindowBounds.x,
    y: mainWindowBounds.y
  });
});
