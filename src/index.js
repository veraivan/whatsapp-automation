const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const electronReload = require('electron-reload');
const { Selenium } = require('./scripts/class-selenium');

//El modulo se ejecuta en modo desarrollo, una vez lista en produccion ya no se requiere el modulo
if ( process.env.NODE_ENV !== 'production' ){
    electronReload(__dirname, {});
}

//Variable global
var ventanaPrincipal;
var selenium = new Selenium();
app.on('ready', createWindows);

function createWindows(){
    ventanaPrincipal = new BrowserWindow({
        width: 900,
        height: 600,
        center: true,
        resizable: false,
        backgroundColor: '#FFF',
        webPreferences:{
            nodeIntegration: true,
        }
    });

    ventanaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname, 'vista/index.html'),
        protocol: 'file',
        slashes: true
    }));

    Menu.setApplicationMenu(null);
    ventanaPrincipal.webContents.openDevTools();
}

//Arranca el browser
ipcMain.handle('inicioSelenium', async (event) =>{
    await selenium.openBrowser();
});

//Envio de un solo mensaje handle(sincronizar con el render) 
ipcMain.handle('enviarMensaje', async (event, data) => {
    await selenium.oneMessage(data);
});


//Cerrar sesion
ipcMain.handle('cerrarSesion', async (event) => {
    await selenium.closedSession();
});

app.on('closed', () =>{
    app.quit();
});