import { obtenerConsultas, eliminarConsulta } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const tablaConsultas = document.getElementById('tablaConsultas');

    // Recupera el historial de consultas desde localStorage
    const historial = obtenerConsultas();

    // Rellena la tabla con los datos
    historial.forEach((consulta, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td class="acciones">
                <button class="btnEliminar" data-index="${index}">Eliminar</button>
                <button class="btnEditar" data-index="${index}">Editar</button>
                <button class="btnAceptar" data-index="${index}">Aceptar</button>
            </td>
            <td class="nombre">${consulta.nombreE}</td>
            <td class="fecha">${consulta.fecha}</td>
            <td class="hora">${consulta.hora}</td>
            <td class="consulta">${consulta.consulta}</td>
            <td class="estado">${consulta.estado || 'Pendiente'}</td>
        `;

        tablaConsultas.appendChild(fila);
    });

    // Maneja el clic en los botones de la tabla
    tablaConsultas.addEventListener('click', (event) => {
        const target = event.target;
        const index = target.getAttribute('data-index');

        if (target.classList.contains('btnEliminar')) {
            const nombreE = document.querySelectorAll('.nombre')[index].textContent;
            eliminarConsulta(nombreE);
            target.closest('tr').remove(); // Elimina la fila de la tabla
        } else if (target.classList.contains('btnEditar')) {
            const consulta = obtenerConsultas()[index];
            const nombreE = consulta.nombreE;
            const tipoDeConsulta = consulta.tipoDeConsulta;
            const consultaTexto = consulta.consulta;
            const fecha = consulta.fecha;
            const hora = consulta.hora;

            // Rellena un formulario de edición (puedes mostrar un modal o una nueva página)
            Swal.fire({
                title: 'Editar Consulta',
                html: `
                    <input id="nombreE" class="swal2-input" value="${nombreE}" readonly>
                    <input id="tipoDeConsulta" class="swal2-input" value="${tipoDeConsulta}" readonly>
                    <textarea id="consulta" class="swal2-textarea">${consultaTexto}</textarea>
                    <input id="fecha" class="swal2-input" type="date" value="${fecha}">
                    <input id="hora" class="swal2-input" type="time" value="${hora}">
                `,
                confirmButtonText: 'Guardar',
                preConfirm: () => {
                    const actualizarConsultas = {
                        nombreE: document.getElementById('nombreE').value,
                        tipoDeConsulta: document.getElementById('tipoDeConsulta').value,
                        consulta: document.getElementById('consulta').value,
                        fecha: document.getElementById('fecha').value,
                        hora: document.getElementById('hora').value,
                        estado: consulta.estado // Mantén el estado actual
                    };
                    guardarConsulta(actualizarConsultas);
                }
            });
        } else if (target.classList.contains('btnAceptar')) {
            const consulta = obtenerConsultas()[index];
            consulta.estado = 'Aceptada';
            guardarConsulta(consulta);
            document.querySelectorAll('.estado')[index].textContent = 'Aceptada'; // Actualiza el estado en la tabla
        }
    });
});