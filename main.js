const { app, BrowserWindow } = require('electron')
const path = require('path')
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 640,
        height: 820,
        webPreferences: {
            preload: path.join(__dirname, 'app.js')
        }
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)
app.on('window-all-closed', () => process.platform == 'darwin' ? null :app.quit())
app.on('activate', () => mainWindow === null ? createWindow() : null)
