import Swal from 'sweetalert2';
import { mostrarAlerta } from './SweetAlert';
import { guardarConsulta } from './guardarConsultas';
import { obtenerConsultas } from './guardarConsultas';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.formulario');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
        
        // Obtiene los valores del formulario
        const nombreE = document.getElementById('NombreE').value.trim();
        const tipoDeConsulta = document.getElementById('tipoDeConsulta').value.trim();
        const consulta = document.getElementById('consulta').value.trim();
        const fecha = document.getElementById('fecha').value.trim();
        const hora = document.getElementById('hora').value.trim();

        // Verifica si algún campo requerido está vacío
        if (!nombreE || tipoDeConsulta === 'seleccione' || !consulta || !fecha || !hora) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos antes de enviar.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return; // Detiene el envío del formulario si hay campos vacíos
        }

        // Crea un objeto con los datos
        const consultaData = {
            nombreE,
            tipoDeConsulta,
            consulta,
            fecha,
            hora
        };

        // Guarda la consulta en localStorage
        guardarConsulta(consultaData);

        // Muestra un mensaje de confirmación
        Swal.fire({
            title: 'Consulta Enviada',
            text: 'Tu consulta ha sido guardada exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Limpia el formulario
        formulario.reset();
    });

    // Redirige a la página de historial cuando se hace clic en el botón
    btnHistorial.addEventListener('click', () => {
        window.location.href = './TablaConsultas.html'; 
    });
});