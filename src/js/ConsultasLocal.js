const nombreE = document.getElementById("NombreE");
const consulta = document.getElementById("consulta");
const fecha = document.getElementById("fecha");
const BtnConsulta = document.getElementById("btnEnviar");
const hora = document.getElementById('hora');
const tipoDeConsultas = document.getElementById("tipoDeConsultas");

let datosLocalStorage = JSON.parse(localStorage.getItem("consultas")) || [];
function GuardarConsulta() {
    let Datosconsulta = {
        nombre: nombreE.value,
        consulta: consulta.value,
        fecha: fecha.value,
        hora:hora.value,
       tipo:tipoDeConsultas.value,
    };
    datosLocalStorage.push(Datosconsulta);
    localStorage.setItem("consultas", JSON.stringify(datosLocalStorage));
    nombreE.value = "";
    consulta.value = "";
    fecha.value = "";
    hora.value = "";
    tipoDeConsultas.value ="";
}
BtnConsulta.addEventListener("click", function(e) {
    e.preventDefault();
    if (nombreE.value === "" || consulta.value === "" || fecha.value === "" || hora.value === "" ) {
        alert("Por favor llenar todos los campos");
    } else{
        alert("consulta enviada exitosamente ")
        GuardarConsulta()
    }
}
);