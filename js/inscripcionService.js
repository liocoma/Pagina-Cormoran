// ======================================================
// SERVICIO DE INSCRIPCIÓN
// ======================================================


// ------------------------------------------------------
// Genera un número de inscripción
// ------------------------------------------------------

function generarNumeroInscripcion(){

    const ahora = new Date();

    const anio = ahora.getFullYear();

    const consecutivo = String(
        Math.floor(Math.random() * 9999) + 1
    ).padStart(4,"0");

    return `COL-${anio}-${consecutivo}`;

}


// ------------------------------------------------------
// Devuelve la fecha actual
// ------------------------------------------------------

function obtenerFechaActual(){

    const fecha = new Date();

    return fecha.toLocaleDateString("es-AR");

}


// ------------------------------------------------------
// Calcula la edad
// ------------------------------------------------------

function calcularEdad(fechaNacimiento){

    if(!fechaNacimiento){

        return "";

    }

    const nacimiento = new Date(fechaNacimiento);

    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const mes = hoy.getMonth() - nacimiento.getMonth();

    if(
        mes < 0 ||
        (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ){

        edad--;

    }

    return edad;

}