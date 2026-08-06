/// ======================================================
// VALIDACIONES
// ======================================================


// ------------------------------------------------------
// Valida todo el formulario
// ------------------------------------------------------

function validarFormulario(){

    if(!validarAlumno()){

        return false;

    }

    if(!validarResponsable()){

        return false;

    }

    if(!validarSemanas()){

        return false;

    }

    return true;

}


// ------------------------------------------------------
// Alumno
// ------------------------------------------------------

function validarAlumno(){

    if(DOM.nombreAlumno.value.trim()===""){

        alert("Debe ingresar el nombre del alumno.");

        DOM.nombreAlumno.focus();

        return false;

    }

    if(DOM.apellidoAlumno.value.trim()===""){

        alert("Debe ingresar el apellido.");

        DOM.apellidoAlumno.focus();

        return false;

    }

    return true;

}


// ------------------------------------------------------
// Responsable
// ------------------------------------------------------

function validarResponsable(){

    if(DOM.nombreResponsable.value.trim()===""){

        alert("Debe ingresar el responsable.");

        DOM.nombreResponsable.focus();

        return false;

    }

    return true;

}

// ------------------------------------------------------
// Semanas
// ------------------------------------------------------

function validarSemanas(){

    ocultarMensajeSemanas();

    const semanas = CONFIG.semanas;

    let haySemanaValida = false;

    for (const [indice, semana] of semanas.entries()) {

        const turnosSeleccionados = document.querySelectorAll(

            `input[name="turnosSemana${indice}"]:checked`

        );

        const tipoAsistencia = document.querySelector(

            `input[name="tipoAsistencia${indice}"]:checked`

        );

        const diasSeleccionados = document.querySelectorAll(

            `input[name="diasSemana${indice}"]:checked`

        );

        if (turnosSeleccionados.length === 0 && !tipoAsistencia) {

            continue;

        }

        if (!tipoAsistencia) {

            mostrarMensajeSemanas(`Debe indicar si ${semana.nombre} es "Semana completa" o "Días sueltos".`);

            return false;

        }

        if (tipoAsistencia.value === "dias" && diasSeleccionados.length === 0) {

            mostrarMensajeSemanas(`Debe seleccionar al menos un día para ${semana.nombre}.`);

            return false;

        }

        haySemanaValida = true;

    }

    if (!haySemanaValida) {

        mostrarMensajeSemanas("Debe seleccionar al menos una semana y completar su asistencia.");

        return false;

    }

    return true;

}

function mostrarMensajeSemanas(texto){

    if (DOM.mensajeSemanas) {

        DOM.mensajeSemanas.textContent = texto;

        DOM.mensajeSemanas.style.display = "block";

    }

}

function ocultarMensajeSemanas(){

    if (DOM.mensajeSemanas) {

        DOM.mensajeSemanas.textContent = "";

        DOM.mensajeSemanas.style.display = "none";

    }

}