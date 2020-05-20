//Importamos de la libreria electron app y BrowserWindows
const { app, BrowserWindow } = require('electron');

//Importamos la libreria de url;
const url = require('url');

//Importamos el modulo Path
const path = require('path');

//Importamos el modulo electron-reaload para cuando haya cambios en los archivos se recarge la app
const electronReload = require('electron-reload');

//El modulo se ejecuta en modo desarrollo, una vez lista en produccion ya no se requiere el modulo
if ( process.env.NODE_ENV !== 'production' ){
    electronReload(__dirname, {});
}

//Variable global
let ventanaPrincipal;

//Una ver que arranca la aplicacion muestre una nueva ventana
app.on('ready', () =>{
    ventanaPrincipal = new BrowserWindow({/*se coloca el ancho de la ventana por el 
    momento es por default*/});

    //Espeficamos la ruta para que lea la vista inical con url.format
    ventanaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname, 'vista/vista-principal.html'),
        protocol: 'file',
        slashes: true
    }));

});