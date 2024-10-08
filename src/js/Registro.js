import Swal from 'sweetalert2';
import { mostrarAlerta } from './SweetAlert';
import { getUsers } from "../Services/Servidores";
import { postUsers } from "../Services/Servidores";

const btnRegistrarse = document.getElementById('btnRegistrarse');
async function validarVacios(e) {
    e.preventDefault();

    const nombre = document.getElementById('inputNombre').value;
    const email = document.getElementById('inputEmail').value;
    const codigo = document.getElementById('inputCodigo').value;
    const clave = document.getElementById('clave').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    if (nombre.trim()==="" || email.trim()==="" || codigo.trim()==="" || clave.trim()==="") {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    // Validar el código con el tipo de usuario
    if (tipoUsuario === 'estudiante' && codigo !== "15") {
        Swal.fire({
            title: 'Error',
            text: 'Codigo de estudiante incorrecto.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    } else if (tipoUsuario === 'profesor' && codigo !== "20") {
        Swal.fire({
            title: 'Error',
            text: 'Codigo de profesor incorrecto.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    

// Crear el objeto del nuevo usuario
let userData = {
    nombre: nombre,
    email: email,
    clave: clave,
    codigo: codigo
};
try {
    // Recupera la lista de usuarios existentes
    let usuarios = await getUsers();  // getUsers() devuelve una lista de usuarios
    
    
    //Verifica si ya existe un usuario con el mismo correo
    let usuarioExistente = usuarios.find(user => user.email === email);
    
    if (usuarioExistente) {
        if (usuarioExistente.nombre === nombre) {
            // Usuario ya registrado con el mismo correo y nombre
            console.log("que esta pasando");
            Swal.fire({
                title: 'Error',
                text: 'Ya existe un usuario con el mismo correo y nombre.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            // Correo ya registrado pero con un nombre diferente
            Swal.fire({
                title: 'Error',
                text: 'El correo electrónico ya está en uso. Por favor, usa un correo diferente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } else {
        await postUsers(userData);
        Swal.fire({
            title: 'Error',
            text: 'Usuario registrado exitosamente.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.log("CHEQUEANDO");
        
        // window.location.href="./Login.html";
        redirigirAlLogin();                                                                                                                        
    }
} catch (error) {
    console.error('Error al procesar la solicitud:', error);
}
}
function redirigirAlLogin() {
    window.location.href = "./Login.html";
}

btnRegistrarse.addEventListener('click',validarVacios)

