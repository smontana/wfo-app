'use strict';
const path = require('path');
const glob = require('glob')
const electron = require('electron');
const app = electron.app;
const config = require('./lib/config');

// jade stuff
const locals = {};
const jade = require('./lib/electron-jade')({pretty: true}, locals);

require('dotenv').load();

var mainWindow = null;
let mainWindowBounds;
let isQuitting = false;

load_main_proc()

function createMainWindow() {
  const lastWindowState = config.get('lastWindowState');

  const win = new electron.BrowserWindow({
    show: false,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    minWidth: 900,
    minHeight: 795,
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
    mainWindow.show();
  });

  mainWindow.on('close', function() {
    mainWindowBounds = mainWindow.getBounds();
  });
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
    // console.log(mainWindowBounds);
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

// Require each JS file in the main-process dir
function load_main_proc () {
  var files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach(function (file) {
    require(file)
  })
}
