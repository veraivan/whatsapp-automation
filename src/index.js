const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const { Selenium } = require('./scripts/class-selenium');


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
    //ventanaPrincipal.webContents.openDevTools();
}

//Arranca el browser
ipcMain.handle('inicioSelenium', async (event) =>{
    await selenium.openBrowser();
});

//Envio de un solo mensaje handle(sincronizar con el render) 
ipcMain.handle('enviarMensaje', async (event, data) => {
    try{
        await selenium.oneMessage(data);
        ventanaPrincipal.webContents.send('mensajeEnviado', data.indice);
        await selenium.deleteContact(data.numero);
    }catch(e){
        ventanaPrincipal.webContents.send('mensajeNoenviado', data.indice);
    }
});


ipcMain.handle('enviarMessageOne', async (event, data) => {
    try{
        await selenium.oneMessage(data);
    }catch(e){
        console.log(e);
    }
});

//Cerrar sesion
ipcMain.handle('cerrarSesion', async (event) => {
    await selenium.closedSession();
});

app.on('closed', () =>{
    app.quit();
});