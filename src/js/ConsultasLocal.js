const NombreE = document.getElementById("NombreE");
const Consulta = document.getElementById("consulta");
const Fecha = document.getElementById("fecha");
const BtnConsulta = document.getElementById("btnEnviar");
let datosLocalStorage = JSON.parse(localStorage.getItem("consultas")) || [];
function GuardarConsulta() {
    let Datosconsulta = {
        nombre: NombreE.value,
        consulta: Consulta.value,
        fecha: Fecha.value,
    };
    datosLocalStorage.push(Datosconsulta);
    localStorage.setItem("consultas", JSON.stringify(datosLocalStorage));
    NombreE.value = "";
    Consulta.value = "";
    Fecha.value = "";
}
BtnConsulta.addEventListener("click", function(e) {
    e.preventDefault();
    if (NombreE.value === "" || Consulta.value === "" || Fecha.value === "" ) {
        alert("Por favor llenar todos los campos");
    } else{
        alert("consulta enviada exitosamente ")
        GuardarConsulta()
    }
}
);