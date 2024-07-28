
let circle = document.querySelector(".circle");
let toggle_box = document.querySelector(".toggle_box");
let checkbox = document.getElementById("checkbox");
let body = document.body;
const lightImage = document.getElementById('light-theme-image');
const darkImage = document.getElementById('dark-theme-image');
// Ventana modal
var modal = document.getElementById("ventanaModal");
// Botón que abre el modal
var boton = document.getElementById("abrirModal");
// Hace referencia al elemento <span> que tiene la X que cierra la ventana
var span = document.getElementsByClassName("close")[0];
var result;
var texto;
var texto_total;
    
// Verificar el estado guardado del tema
if (localStorage.getItem('theme') === 'dark') {
    checkbox.checked = true;
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
} else {
    checkbox.checked = false;
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
}

toggle_box.onclick = function(){
    if(checkbox.checked){
        checkbox.checked = false;
        lightImage.style.display = 'block';
        darkImage.style.display = 'none';
        localStorage.setItem('theme', 'light');
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    } else {
        checkbox.checked = true;
        lightImage.style.display = 'none';
        darkImage.style.display = 'block';
        localStorage.setItem('theme', 'dark');
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }
}




condiciones_iniciales();
function condiciones_iniciales(){
    ocultar('encripta_texto');
    mostrar('inicio');
    document.getElementById('texto').focus();
    
}
function encriptar(){
    texto= document.getElementById('texto').value;
    result= checkType(texto);
    console.log(result);
    if (document.getElementById('texto').value==''){
      Swal.fire({
        title: 'Oops...',
        text: 'No se encontro texto',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#BF8CE1',
        //background:'',
        color:'#4F1271',
        customClass:{
          popup: 'popup-class'
          },
      });
      condiciones_iniciales();
        }
        else if (result == '1' || result=='2'){
          Swal.fire({
            title: 'Oops...',
            html: `No se aceptan letras mayúsculas.
       <br> <br>
      No usar caracteres especiales, ni acentos.
       <br> <br>
       No se aceptan números.`,
            icon: 'error',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#BF8CE1',
            //background:'',
            color:'#4F1271',
            customClass:{
              popup: 'popup-class'
              },
          });
       condiciones_iniciales()
    
        }
        else{
    ocultar('inicio');
    const chars = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o':  'ober',
        'u':  'ufat'
      };
      s = texto.replace(/[aeiou]/g, m => chars[m]);
    asignarTextoElemento('#texto_total',s);
    mostrar('encripta_texto');
    limpiarCaja('#texto');
    document.getElementById('texto').focus();
}
}


function desencriptar(){
    texto= document.getElementById('texto').value;
    result= checkType(texto);
    if (document.getElementById('texto').value==''){
      Swal.fire({
        title: 'Oops...',
        text: 'No se encontro texto',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#BF8CE1',
        //background:'',
        color:'#4F1271',
        customClass:{
          popup: 'popup-class'
          },
      });
        condiciones_iniciales();
        }
        else if (result == '1' || result=='2'){
          Swal.fire({
            title: 'Oops...',
            html: `No se aceptan letras mayúsculas.
       <br> <br>
      No usar caracteres especiales, ni acentos.
       <br> <br>
       No se aceptan números.`,
            icon: 'error',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#BF8CE1',
            //background:'',
            color:'#4F1271',
            customClass:{
              popup: 'popup-class'
              },
          });condiciones_iniciales()
    
        }

        else{
            ocultar('inicio');
            const reverseChars = {
                'ai':'a',
                'enter':'e',
                'imes':'i',
                'ober':'o',
                'ufat':'u'
              };
              // Crear una expresión regular para buscar las secuencias codificadas
            const reverseRegEx = new RegExp(Object.keys(reverseChars).join('|'), 'g');
            // Reemplazar las secuencias codificadas con sus correspondientes vocales
            s = s.replace(reverseRegEx, m => reverseChars[m]);
            asignarTextoElemento('#texto_total',s);
            mostrar('encripta_texto');
            limpiarCaja('#texto');
            document.getElementById('texto').focus();
        }

}


function copiar(){
    texto_total= document.getElementById("texto_total").value; 
        navigator.clipboard.writeText(texto_total).then(function() {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Texto copiado con exito",
            showConfirmButton: false,
            timer: 1500, 
            color:'#4F1271',
            customClass:{
              popup: 'popup-class'
              },
          });condiciones_iniciales();
        }).catch(function(err) {
          Swal.fire({
            title: 'Error al copiar texto',
            icon: 'error',
            showConfirmButton: false,
            //background:'',
            color:'#4F1271'});
        });
}



function ocultar(objeto){
    document.getElementById(objeto).style.display = 'none';
}

function mostrar(objeto){
    document.getElementById(objeto).style.display = 'flex';
}
function limpiarCaja(caja){
    document.querySelector(caja).value='';
    return;
}
function asignarTextoElemento(elemento,texto){
    let elementoHTML= document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function checkType(mensaje) {
    mensaje = String(mensaje).replace(/[" "]/g,"");
    mensaje = String(mensaje).trim();
    console.log(mensaje);
    const regxs = {
      "lower": /^[a-z]+$/,
      "upper": /^[A-Z0-9ÁÉÍÓÚÑÜ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
      "upperLower":  /^[A-Za-z0-9ÁÉÍÓÚÑÜáéíóúñü!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
    }; 
    if (regxs.lower.test(mensaje)) {
        return '0';
      }
   
      if (regxs.upper.test(mensaje)){
       return '1';
      }
   
      if (regxs.upperLower.test(mensaje)){
       return '2';
      }
      
      return -1;
  }


