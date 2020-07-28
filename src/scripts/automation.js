const $ = require('jquery');
const { ipcRenderer } = require('electron');
const Papa = require('papaparse');


let l_form, enviar_one, enviar_mul, navbar_notification, navbar, sent;
let text_cerrar, loader, file, form_mul, one, mul, panel, total, inputNumber;
let count_me = count_mne = 0;

document.addEventListener('DOMContentLoaded', () =>{
    inputNumber = document.querySelector('#number');
    total = document.querySelector('.total');
    total.style.display = 'none';
    one = document.querySelector('#one');
    mul = document.getElementById('mul');
    text_cerrar = document.querySelector('#text-cerrar');
    form_mul = document.querySelector('#mul-message');
    form_mul.style.display = 'none';
    loader = document.querySelector('#loader');
    loader.style.display = 'none';
    let btn_cerrar = document.querySelector('#btn-cerrar');
    navbar_notification = document.querySelector('.enviando');
    sent = document.querySelector('.sent');
    navbar = document.querySelector('#n_bar');
    l_form = document.querySelector('#one-message');
    enviar_one = document.querySelector('#enviar-one');
    enviar_one.disabled = true;
    enviar_mul = document.querySelector('#enviar-mul');
    enviar_mul.disabled = true;
    navbar_notification.style.display = 'none';
    sent.style.display = 'none';
    l_form.addEventListener('input', comprobarCampos);
    inputNumber.addEventListener('keypress', validationNumber, false);   
    enviar_one.addEventListener('click', enviarMensaje, false);
    btn_cerrar.addEventListener('click', cerrarSesion, false);
    one.addEventListener('click', () =>{
        l_form.style.display = 'flex';
        form_mul.style.display = 'none';
    }, false);
    mul.addEventListener('click', () => {
        l_form.style.display = 'none';
        form_mul.style.display = 'flex';
    }, false);   

    enviar_mul.addEventListener('click', envioMultiple, false);
});

$(document).on('change', '#fileCSV', (event) =>{
    file = event.target.files[0];

    let show = "<span>Archivo seleccionado : </span>" + file.name;
    let output = document.getElementById('selector');
    output.innerHTML = show;
    output.classList.add("active-file");
});

$(document).on('input', '#mul-message', () =>{
    if ( fileCSV.files.length > 0 && text_messageMul.value.length > 0){
        enviar_mul.disabled = false;
    }
    else{
        enviar_mul.disabled = true;
    }
});

//Active class event
$(document).on('click', '.options', function () {
    let val = document.querySelector('.active');
    val.classList.remove('active');
    $(this).addClass("active");
});

function comprobarCampos(){
    if ( number.value.length > 0 && text_messageOne.value.length > 0 ){
        enviar_one.disabled = false;
    } 
    else{
        enviar_one.disabled = true;
    }
}

function inputfile(event){
    file = event.target.files;

    let show = "<span>Archivo seleccionado : </span>" + file[0].name;
    let output = document.getElementById('selector');
    output.innerHTML = show;
    output.classList.add("active-file");
}

async function enviarMensaje(e){

    navbar.classList.remove('navbar-1');
    navbar.classList.add('navbar-2');
    navbar_notification.style.display = 'flex';

    const data = {
        numero: "595" + document.querySelector('#number').value,
        text: document.querySelector('#text_messageOne').value
    };

    //reset form
    l_form.reset();
    e.preventDefault();

    await ipcRenderer.invoke('enviarMessageOne', data);
    
    navbar_notification.style.display = 'none';
    sent.style.display = 'flex';

    setTimeout(() =>{
        sent.style.display = 'none';
        navbar.classList.remove('navbar-2');
        navbar.classList.add('navbar-1');
    }, 5000);
}

ipcRenderer.on('mensajeNoenviado', (event, numero) =>{
    count_mne++;
    mensajeFallido(numero);
    let mne = document.getElementById('mne');
    mne.innerHTML = count_mne;
});

ipcRenderer.on('mensajeEnviado', (event, numero) =>{
    count_me++;
    mensajeExitoso(numero);
    let me = document.getElementById('me');
    me.innerHTML = count_me;
});

async function cerrarSesion(){
    text_cerrar.style.display = 'none';
    loader.style.display = 'block';
    await ipcRenderer.invoke('cerrarSesion');
    location.href = "index.html";
}

async function envioMultiple(event){
    form_mul.style.display = 'none';
    let padre = document.querySelector('.text');
    panel = document.createElement('div');
    panel.classList.add('panel');
    padre.appendChild(panel);
        
    Papa.parse(file, {
        delimiter: ",",
        header: false,
        complete: function(results){
            listaContactos(results.data);
        }
    });
    event.preventDefault();
}

async function listaContactos(lista){
    navbar.classList.remove('navbar-1');
    navbar.classList.add('navbar-2');
    total.style.display = 'flex';
    document.getElementById('tn').innerHTML = lista.length;

    for ( let i = 1; i < lista.length; i++ ){
        data = {
            numero: lista[i][0],
            text: document.getElementById('text_messageMul').value,
            indice: i
        }
        enviandoMensaje(data.indice);
        await ipcRenderer.invoke('enviarMensaje', data);
    }
    panel.remove();
    form_mul.style.display = 'flex';
}


function enviandoMensaje(numero){
    let divEnviar = document.createElement('div');
    divEnviar.setAttribute('id', "no-" + numero);
    divEnviar.classList.add('notificacion');
    panel.appendChild(divEnviar);
    let p = document.createElement('p');
    p.classList.add('p-sending');
    p.innerHTML = "Enviando mensaje...";
    divEnviar.appendChild(p);
}

function mensajeExitoso(numero) {
    let divEnviar = document.getElementById("no-" + numero);
    divEnviar.style.background = "green";
    divEnviar.innerHTML = "";
    let p = document.createElement('p');
    p.innerHTML = "Mensaje Enviado";
    divEnviar.appendChild(p);
    let i = document.createElement('i');
    i.classList.add('fas', 'fa-check-circle', 'fa-2x');
    divEnviar.appendChild(i);
}

function mensajeFallido(numero){
    let divEnviar = document.getElementById("no-" + numero);
    divEnviar.style.background = "red";
    divEnviar.innerHTML = "";
    let p = document.createElement('p');
    p.innerHTML = "Mensaje no enviado";
    divEnviar.appendChild(p);
    let i = document.createElement('i');
    i.classList.add('fas', 'fa-times-circle', 'fa-2x');
    divEnviar.appendChild(i);
}

function validationNumber(event){
    let key = event.charCode;
    if ( key < 48 || key > 57 ){
        event.preventDefault();
    }
}