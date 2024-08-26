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
        alert('Ingresa todos tus datos');
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
            alert('Ya existe un usuario con el mismo correo y nombre');
        } else {
            // Correo ya registrado pero con un nombre diferente
            alert('El correo electrónico ya está en uso. Por favor, usa un correo diferente.');
        }
    } else {
        await postUsers(userData);
        alert('Usuario registrado exitosamente');
    }
} catch (error) {
    console.error('Error al procesar la solicitud:', error);
}
}
    
    
    btnRegistrarse.addEventListener('click',validarVacios)

