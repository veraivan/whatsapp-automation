const $ = require('jquery');
const { ipcRenderer } = require('electron');

let l_form, enviar_btn, navbar_notification, navbar, sent;
let text_cerrar, loader;

document.addEventListener('DOMContentLoaded', () =>{
    text_cerrar = document.querySelector('#text-cerrar');
    loader = document.querySelector('#loader');
    loader.style.display = 'none';
    let btn_cerrar = document.querySelector('#btn-cerrar');
    navbar_notification = document.querySelector('.enviando');
    sent = document.querySelector('.sent');
    navbar = document.querySelector('#n_bar');
    l_form = document.querySelector('#one-message');
    enviar_btn = document.querySelector('#enviarbtn');
    enviar_btn.disabled = true;
    navbar_notification.style.display = 'none';
    sent.style.display = 'none';
    l_form.addEventListener('input', comprobarCampos);   
    enviar_btn.addEventListener('click', enviarMensaje, false);
    btn_cerrar.addEventListener('click', cerrarSesion, false);
});

//Active class event
$(document).on('click', '.options', function () {
    let val = document.querySelector('.active');
    val.classList.remove('active');
    $(this).addClass("active");
});

function comprobarCampos(){

    if ( number.value.length > 0 && message.value.length > 0 ){
        enviar_btn.disabled = false;
    } 
    else{
        enviar_btn.disabled = true;
    }
}

async function enviarMensaje(e){

    navbar.classList.remove('navbar-1');
    navbar.classList.add('navbar-2');
    navbar_notification.style.display = 'flex';

    const data = {
        numero: document.querySelector('#number').value,
        text: document.querySelector('#message').value
    };

    //reset form
    document.getElementById('one-message').reset();

    await ipcRenderer.invoke('enviarMensaje', data);
    navbar_notification.style.display = 'none';
    sent.style.display = 'flex';

    setTimeout(() =>{
        sent.style.display = 'none';
        navbar.classList.remove('navbar-2');
        navbar.classList.add('navbar-1');
    }, 6000);

    e.preventDefault();
}


async function cerrarSesion(){
    text_cerrar.style.display = 'none';
    loader.style.display = 'block';
    await ipcRenderer.invoke('cerrarSesion');
    location.href = "index.html";
}
