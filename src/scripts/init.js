const { ipcRenderer } = require('electron');

//Load html template 
let loader, bscanner;
document.addEventListener('DOMContentLoaded', () =>{
    loader = document.querySelector('#loader');
    loader.style.display = 'none';
    bscanner = document.querySelector('#text');
    let scaner = document.querySelector('#scanerQR');
    scaner.addEventListener('click', inicioSelenium, false);
});

async function inicioSelenium(){
    console.log("llamo a la funcion");
    bscanner.style.display = 'none';
    loader.style.display = 'block';
    await ipcRenderer.invoke('inicioSelenium');
    location.href = "imageQR.html";
}