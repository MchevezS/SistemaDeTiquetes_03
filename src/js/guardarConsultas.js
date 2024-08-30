// 

// Función para guardar una consulta en el localStorage
export function guardarConsulta(consultaData) {
    const historial = JSON.parse(localStorage.getItem('historialConsultas')) || [];
    historial.push(consultaData);
    localStorage.setItem('historialConsultas', JSON.stringify(historial));
}

// Función para recuperar consultas del localStorage
 export function obtenerConsultas() {
    return JSON.parse(localStorage.getItem('historialConsultas')) || [];
}

// Función para eliminar una consulta
 export function eliminarConsulta(nombreE) {
    let historial = JSON.parse(localStorage.getItem('historialConsultas')) || [];
    historial = historial.filter(consulta => consulta.nombreE !== nombreE);
    localStorage.setItem('historialConsultas', JSON.stringify(historial));
}
