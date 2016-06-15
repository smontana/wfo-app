'use strict';

const {app, BrowserWindow} = require('electron');
const locals = {/* ...*/};
const jade = require('./lib/electron-jade')({pretty: true}, locals);

require('dotenv').load();

let mainWindow;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

  mainWindow = new BrowserWindow({
    width: 1000, 
    height: 800
  });

  // NOTE: the URL is enclosed in backticks NOT single quotes
  mainWindow.loadURL(`file://${__dirname}/index.jade`);
  
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
