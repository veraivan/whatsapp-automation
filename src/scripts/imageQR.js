const fs = require('fs');
const path = require('path');

document.addEventListener('DOMContentLoaded', () =>{
    let btn_continue = document.querySelector('#btn-continue');
    btn_continue.addEventListener('click', ()=>{
        fileUrl = path.join(process.env.HOME, 'whatsapp-automation/recursos/images', 'codigoQR.png');
        fs.unlinkSync(fileUrl);
        location.href = "view-main.html";
    });
});