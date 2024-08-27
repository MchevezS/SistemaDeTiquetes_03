// Metodo post: Guarda los datos.
async function postUsers(userData, usuarioNuevo) {
    try {
        const response = await fetch("http://localhost:3001"+ endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData, usuarioNuevo)
        });
        const data = await response.json()
        // console.log(data);
        return data
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}
export{postUsers}


//Metodo Get: Obtiene informacio
async function getUsers(userData, usuarioExiste) {
    try {
        const response = await fetch('http://localhost:3001'+ endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData, usuarioExiste)
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
export { getUsers};

// Metodo Put: Actualiza datos
async function updateUsers(nombre, email, clave) {
    try {

        const userData = { 
            nombre, 
            email,
            clave

        };
        const response = await fetch("http://localhost:3001/users/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });


        return await response.json();
    } catch (error) {
        console.error('Error update user:', error);
        throw error;
    }
}

export{updateUsers}


// Metodo Delete: Elimina datos.
async function EliminarUsuario(id) {
    try {
        const response = await fetch(`http://localhost:3001/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export { EliminarUsuario };
