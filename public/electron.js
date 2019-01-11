const { app, BrowserWindow, shell, ipcMain, Menu, TouchBar, Tray } = require('electron');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;

const path = require('path');
const isDev = false;
const assetsDirectory = path.join(__dirname, 'img')

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        transparent: true,
        vibrancy: 'dark',
        frame: false,
        width: 725,
        height: 200,
        resizable: false,
        minimizable: true,
        maximizable: false,
        fullscreenable: false,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js',
        }
    });

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`,
    );

    if (isDev) {
        const {
            default: installExtension,
            REACT_DEVELOPER_TOOLS,
            REDUX_DEVTOOLS,
        } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS)
            .then(name => {
                console.log(`Added Extension: ${name}`);
            })
            .catch(err => {
                console.log('An error occurred: ', err);
            });

        installExtension(REDUX_DEVTOOLS)
            .then(name => {
                console.log(`Added Extension: ${name}`);
            })
            .catch(err => {
                console.log('An error occurred: ', err);
            });
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        ipcMain.on('open-external-window', (event, arg) => {
            shell.openExternal(arg);
        });
    });
};


app.on('ready', () => {
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('load-page', (event, arg) => {
    mainWindow.loadURL(arg);
});

// Creates tray image & toggles window on click
const createTray = () => {
    let tray = new Tray(path.join(assetsDirectory, 'icon.png'))
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip('Platr')
    tray.setContextMenu(contextMenu)
}