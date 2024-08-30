const nombreE = document.getElementById("NombreE");
const consulta = document.getElementById("consulta");
const fecha = document.getElementById("fecha");
const hora = document.getElementById('hora');
const tipoDeConsulta = document.getElementById("tipoDeConsulta"); // ID correcto para el campo tipo de consulta
const BtnConsulta = document.getElementById("btnEnviar");
const listaConsulta = document.getElementById('listaConsulta');

// Obtener datos del localStorage o inicializar un array vacío
let datosLocalStorage = JSON.parse(localStorage.getItem("consultas")) || [];

// Función para guardar una consulta
function GuardarConsulta() {
    // Crear el objeto con todos los datos, incluyendo el tipo de consulta
    let Datosconsulta = {
        nombre: nombreE.value,
        consulta: consulta.value,
        fecha: fecha.value,
        hora: hora.value,
        tipo: tipoDeConsulta.value // Agregar el tipo de consulta
    };

    // Agregar la consulta al array y al localStorage
    datosLocalStorage.push(Datosconsulta);
    localStorage.setItem("consultas", JSON.stringify(datosLocalStorage));

    // Limpiar los campos
    nombreE.value = "";
    consulta.value = "";
    fecha.value = "";
    hora.value = "";
    tipoDeConsulta.value = "seleccione"; // Limpiar el campo tipo de consulta

    // Actualizar la lista de consultas en la interfaz
    RenderizaConsultas();
}

// Función para renderizar las consultas en la interfaz
function RenderizaConsultas() {
    // Limpiar la lista actual
    listaConsulta.innerHTML = "";

    // Renderizar cada consulta en la lista
    datosLocalStorage.forEach((consulta) => {
        let lista = document.createElement('li');
        lista.textContent = `${consulta.nombre} - ${consulta.consulta} - ${consulta.fecha} - ${consulta.hora} - Tipo: ${consulta.tipo}`;
        listaConsulta.appendChild(lista);
    });
}

// Inicializar la lista de consultas al cargar la página
RenderizaConsultas();

// Evento al hacer clic en el botón de enviar
BtnConsulta.addEventListener("click", function(e) {
    e.preventDefault();
    if (nombreE.value === "" || consulta.value === "" || fecha.value === "" || hora.value === "" || tipoDeConsulta.value === "seleccione") {
        alert("Por favor llenar todos los campos");
    } else {
        alert("Consulta enviada exitosamente");
        GuardarConsulta();
    }
});