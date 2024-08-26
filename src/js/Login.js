import { getUsers } from "../Services/Servidores";
import { postUsers } from "../Services/Servidores";

let btnRedireccionar = document.getElementById('btnRedireccionar');
let btnInicio = document.getElementById('btnIncio')
async function validarLogin(e) {
    e.preventDefault(); // Evitar el envío del formulario
    
    // Obtener los valores de los campos de entrada
    let codigoLogin = document.getElementById('codigoLogin').value;
    let emailLogin = document.getElementById('emailLogin').value;
    let claveLogin = document.getElementById('claveLogin').value;
    let tipoUsuario = document.getElementById('tipoUsuario').value;

    // Validar que los campos no estén vacíos
    if (emailLogin.trim() === "" || claveLogin.trim() === "" || codigoLogin.trim()=== "") {
        alert('Ingrese todos sus datos');
        return;
    }

    // Validar el código con el tipo de usuario
    if (tipoUsuario === 'estudiante' && codigo !== "15") {
        alert('El código de estudiante es incorrecto');
        return;
    } else if (tipoUsuario === 'profesor' && codigo !== "20") {
        alert('El código de profesor es incorrecto');
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
                alert('Login exitoso');
                // Redirigir al usuario o realizar alguna acción
                // window.location.href = "/"; // Ejemplo: redirigir al dashboard
            } else {
                // Clave incorrecta
                alert('La clave es incorrecta');
            }
        } else {
            // Usuario no encontrado
            alert('No se encontró un usuario con ese correo electrónico');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        alert('Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde.');
    }
}

btnInicio.addEventListener('click',validarLogin)
// btnRedireccionar.addEventListener('click',
//      window.location.href = "../Registro.html"
//     )
