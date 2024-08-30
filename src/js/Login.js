import Swal from 'sweetalert2';
import { mostrarAlerta } from './SweetAlert';
import { getUsers } from "../Services/Servidores";
import { postUsers } from "../Services/Servidores";

let btnRedireccionar = document.getElementById('btnRedireccionar');
let btnInicio = document.getElementById('btnIncio')

async function validarLogin() {
     
    
    // Obtener los valores de los campos de entrada
    let codigoLogin = document.getElementById('codigoLogin').value;
    let emailLogin = document.getElementById('emailLogin').value;
    let claveLogin = document.getElementById('claveLogin').value;
    let tipoUsuario = document.getElementById('tipoUsuario').value;

    // Validar que los campos no estén vacíos
    if (emailLogin.trim() === "" || claveLogin.trim() === "" || codigoLogin.trim()=== "") {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    // Validar el código con el tipo de usuario
    if (tipoUsuario === 'estudiante' && codigoLogin !== "15") {
        console.log(codigoLogin);
        Swal.fire({
            title: 'Error',
            text: 'Por favor, Ingresa correctamente tu codigo de Estudiante',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    } else if (tipoUsuario === 'profesor' && codigoLogin !== "20") {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, Ingresa correctamente tu codigo de Profesor.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Verificar los datos del login
    try {
        // Obtener la lista de usuarios desde el servidor
        let usuarios = await getUsers(); // getUsers() debería devolver una lista de usuarios

        // Buscar el usuario que coincida con el correo ingresado
        let usuario = usuarios.find(user => user.email === emailLogin);

        if (usuario) {
            // Verificar la clave del usuario
            if (usuario.clave === claveLogin) {
                // Login exitoso
                Swal.fire({
                    title: 'Error',
                    text: 'Login Exitoso.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                // Redirige al usuario 
                window.location.href = "./Consultas.html"; 
            } else {
                // Clave incorrecta
                Swal.fire({
                    title: 'Error',
                    text: 'Clave incorrecta.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            // Usuario no encontrado
            Swal.fire({
                title: 'Error',
                text: 'No se ha encontrado un Usuario con ese Correo electronico.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

btnInicio.addEventListener('click',function () {
    validarLogin()
});
btnRedireccionar.addEventListener('click',function() {
    window.location.href= "./Registro.html"
})
