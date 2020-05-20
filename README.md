# Descripcion del Problema

Desarrollar un aplicacion de escritorio multiplataforma, el objetivo de la app es poder automatizar el envio de mensajes a multiples contactos haciendo uso de su cuenta de Whatsapp. 

## Los requisitos que debe tener la aplicacion
Esto seran los requisitos por el momento, a medidia que avancemos en el desarrollo surgiran nuevos requisitos.

* Interfaz de inicio de la app 
* Un menu para usuario(por el momento tendria una sola opcion que seria el envio de mensajes)
* La interfaz del envio de mensaje debe tener los siguientes campos:
  * Un campo para importar el excel en formato .csv 
  * Campo para colocar la cantidad de contactos a enviar el mensaje
  * Lista de contactos para que selecione el usuario 
  * Un campo para escribir el mensaje a enviar
  * Un boton para enviar 
  * Y una opcion para ver en tiempo real como trabaja el navegador automatizado
* La logica en python
  * Usar el navegador chrome para la interaccion
  * Debe poder hacer uso del excel importado y extraer todos los datos  
  * Hacer uso de la libreria selenium para interactuar con el navegador
  * Recuperar los datos de los inputs y enviarlo al script python
  
* Integrar python con electron, en la logica debe poder recuperar los datos que va ingresando el usuario y enviarlo al script.py 

* El instalador del programa por el momento para Windows 


## Herramientras a utilizar para el desarrollo

> La aplicacion seria del tipo PWA(Progressive Web Apps) ya que utilizaremos tecnologia web para el desarrollo de la interfaz de usuario, para eso utilizaremos el framework ***Electron JS***. 

* [Documentacion Electron JS](https://www.electronjs.org/docs)


> Para la logica se utilizara python3 y la libreria Selenium para la automatizacion haciendo uso del navegador. 
 
 * [Documentacion Selenium](https://www.selenium.dev/documentation/es/)
 

## Preparar el entorno de desarrollo 

Tener instalado nodejs version 12 para adelante y python3 en su maquina local. 

### Pasos:

Clonar el repositorio:
```bash
 git clone https://github.com/veraivan/whatsapp-automation.git
```

Una vez clonado el proyecto instale las dependecias con el siguiente comando:
```bash
npm install 
```

Para levantar el proyecto con el comando:
```bash
npm start
```
