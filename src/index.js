const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');
const electronReload = require('electron-reload');

//El modulo se ejecuta en modo desarrollo, una vez lista en produccion ya no se requiere el modulo
if ( process.env.NODE_ENV !== 'production' ){
    electronReload(__dirname, {});
}

//Variable global
var ventanaPrincipal;
app.on('ready', createWindows);

function createWindows(){
    ventanaPrincipal = new BrowserWindow({
        width: 900,
        height: 600,
        center: true,
        resizable: false,
        backgroundColor: '#FFF',
        webPreferences:{
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname, 'vista/view-main.html'),
        protocol: 'file',
        slashes: true
    }));

    Menu.setApplicationMenu(null);
    //ventanaPrincipal.webContents.openDevTools();
}