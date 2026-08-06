/// ======================================================
// VALIDACIONES
// ======================================================


// ------------------------------------------------------
// Valida todo el formulario
// ------------------------------------------------------

function validarFormulario(){

    clearAllFieldErrors();

    if(!validarAlumno()){

        return false;

    }

    if(!validarResponsable()){

        return false;

    }

    if(!validarSemanas()){

        return false;

    }

    if(!validarConfirmacion()){

        return false;

    }

    return true;

}


// ------------------------------------------------------
// Helpers para errores inline
// ------------------------------------------------------

function mostrarErrorCampo(elemento, texto){

    if(!elemento) return;

    clearFieldError(elemento);

    const cont = elemento.closest('.grupo-input') || elemento.parentElement;

    const div = document.createElement('div');
    div.className = 'mensaje-validacion';
    div.setAttribute('role', 'alert');
    div.style.display = 'block';
    div.classList.add('arrow-top');
    div.textContent = texto;

    cont.appendChild(div);

}

function clearFieldError(elemento){

    if(!elemento) return;

    const cont = elemento.closest('.grupo-input') || elemento.parentElement;

    if(!cont) return;

    const existente = cont.querySelector('.mensaje-validacion');

    if(existente) existente.remove();

}

function clearAllFieldErrors(){
    const rootDom = (typeof window !== 'undefined' && window.DOM) ? window.DOM : DOM;

    document.querySelectorAll('.grupo-input .mensaje-validacion').forEach(el=>el.remove());
    if (rootDom && rootDom.mensajeSemanas) {
        rootDom.mensajeSemanas.style.display = 'none';
        rootDom.mensajeSemanas.textContent = '';
    }
}

function limpiarMensajePorCampo(elemento){

    if(!elemento) return;

    if (elemento.id === 'aceptaCondiciones' || elemento.name === 'aceptaCondiciones') {

        const cont = elemento.parentElement;

        if(cont) cont.querySelectorAll('.mensaje-validacion').forEach(el=>el.remove());

    } else {

        const cont = elemento.closest('.grupo-input') || elemento.parentElement;

        if(cont) cont.querySelectorAll('.mensaje-validacion').forEach(el=>el.remove());

    }

    if (elemento.name && /^(turnosSemana|tipoAsistencia|diasSemana)/.test(elemento.name)) {

        ocultarMensajeSemanas();

    }

}

function registrarLimpiezaAutomatica(){

    if(!DOM.formulario) return;

    const campos = DOM.formulario.querySelectorAll('input, select, textarea');

    campos.forEach(campo => {

        campo.addEventListener('input', () => limpiarMensajePorCampo(campo));
        campo.addEventListener('change', () => limpiarMensajePorCampo(campo));

    });

}


// ------------------------------------------------------
// Alumno
// ------------------------------------------------------

function validarAlumno(){

    if(!DOM.nombreAlumno || DOM.nombreAlumno.value.trim()===""){

        mostrarErrorCampo(DOM.nombreAlumno, "Debe ingresar el nombre del alumno.");

        if (DOM.nombreAlumno) DOM.nombreAlumno.focus();

        return false;

    }

    if(!DOM.apellidoAlumno || DOM.apellidoAlumno.value.trim()===""){

        mostrarErrorCampo(DOM.apellidoAlumno, "Debe ingresar el apellido.");

        if (DOM.apellidoAlumno) DOM.apellidoAlumno.focus();

        return false;

    }

    // DNI
    if(!DOM.dniAlumno || DOM.dniAlumno.value.trim()===""){

        mostrarErrorCampo(DOM.dniAlumno, "Debe ingresar el DNI del alumno.");

        if (DOM.dniAlumno) DOM.dniAlumno.focus();

        return false;

    }

    // Fecha de nacimiento
    if(!DOM.fechaNacimiento || DOM.fechaNacimiento.value.trim()===""){

        mostrarErrorCampo(DOM.fechaNacimiento, "Debe ingresar la fecha de nacimiento.");

        if (DOM.fechaNacimiento) DOM.fechaNacimiento.focus();

        return false;

    }

    // Si es socio, pedir número
    if(DOM.esSocio && DOM.esSocio.value==="SI"){

        if(!DOM.numeroSocio || DOM.numeroSocio.value.trim()===""){

            mostrarErrorCampo(DOM.numeroSocio, "Ingrese el número de socio.");

            if (DOM.numeroSocio) DOM.numeroSocio.focus();

            return false;

        }

    }

    return true;

}


// ------------------------------------------------------
// Responsable
// ------------------------------------------------------

function validarResponsable(){

    if(!DOM.nombreResponsable || DOM.nombreResponsable.value.trim()===""){

        mostrarErrorCampo(DOM.nombreResponsable, "Debe ingresar el responsable.");

        if (DOM.nombreResponsable) DOM.nombreResponsable.focus();

        return false;

    }

    if(!DOM.telefonoResponsable || DOM.telefonoResponsable.value.trim()===""){

        mostrarErrorCampo(DOM.telefonoResponsable, "Debe ingresar el teléfono del responsable.");

        if (DOM.telefonoResponsable) DOM.telefonoResponsable.focus();

        return false;

    }

    if(!DOM.emailResponsable || DOM.emailResponsable.value.trim()===""){

        mostrarErrorCampo(DOM.emailResponsable, "Debe ingresar el correo del responsable.");

        if (DOM.emailResponsable) DOM.emailResponsable.focus();

        return false;

    }

    return true;

}


// ------------------------------------------------------
// Confirmación
// ------------------------------------------------------

function validarConfirmacion(){

    if(DOM.aceptaCondiciones && !DOM.aceptaCondiciones.checked){

        mostrarErrorCampo(DOM.aceptaCondiciones, "Debe aceptar las condiciones para continuar.");

        if (DOM.aceptaCondiciones) DOM.aceptaCondiciones.focus();

        return false;

    }

    return true;

}


// ------------------------------------------------------
// Semanas
// ------------------------------------------------------

function mostrarMensajeSemanas(texto){
    const rootDom = (typeof window !== 'undefined' && window.DOM) ? window.DOM : DOM;

    if (rootDom && rootDom.mensajeSemanas) {
        rootDom.mensajeSemanas.textContent = texto;
        rootDom.mensajeSemanas.style.display = 'block';
        rootDom.mensajeSemanas.classList.add('arrow-top');
    }
}

function ocultarMensajeSemanas(){
    const rootDom = (typeof window !== 'undefined' && window.DOM) ? window.DOM : DOM;

    if (rootDom && rootDom.mensajeSemanas) {
        rootDom.mensajeSemanas.textContent = '';
        rootDom.mensajeSemanas.style.display = 'none';
        rootDom.mensajeSemanas.classList.remove('arrow-top');
    }
}

function validarSemanas(){

    if (typeof window !== 'undefined' && window.ocultarMensajeSemanas) {
        window.ocultarMensajeSemanas();
    } else {
        ocultarMensajeSemanas();
    }

    const semanas = CONFIG.semanas || [];

    let haySemanaValida = false;

    for (let indice = 0; indice < semanas.length; indice++) {

        const semana = semanas[indice];
        const turnosSeleccionados = document.querySelectorAll(
            `input[name="turnosSemana${indice}"]:checked`
        );
        const tipoAsistencia = document.querySelector(
            `input[name="tipoAsistencia${indice}"]:checked`
        );
        const diasSeleccionados = document.querySelectorAll(
            `input[name="diasSemana${indice}"]:checked`
        );

        const semanaTieneTurnos = turnosSeleccionados.length > 0;
        const semanaTieneAsistencia = !!tipoAsistencia || diasSeleccionados.length > 0;
        const semanaTieneSeleccion = semanaTieneTurnos || semanaTieneAsistencia;

        if (!semanaTieneSeleccion) {
            continue;
        }

        if (!semanaTieneTurnos) {
            if (typeof window !== 'undefined' && window.mostrarMensajeSemanas) {
                window.mostrarMensajeSemanas(`Debe seleccionar al menos un turno para ${semana.nombre}.`);
            } else {
                mostrarMensajeSemanas(`Debe seleccionar al menos un turno para ${semana.nombre}.`);
            }

            const primerTurno = document.querySelector(`input[name="turnosSemana${indice}"]`);
            if (primerTurno && typeof primerTurno.focus === 'function') primerTurno.focus();
            return false;
        }

        if (!tipoAsistencia) {
            if (typeof window !== 'undefined' && window.mostrarMensajeSemanas) {
                window.mostrarMensajeSemanas(`Debe indicar si ${semana.nombre} es "Semana completa" o "Días sueltos".`);
            } else {
                mostrarMensajeSemanas(`Debe indicar si ${semana.nombre} es "Semana completa" o "Días sueltos".`);
            }

            const primerTipo = document.querySelector(`input[name="tipoAsistencia${indice}"]`);
            if (primerTipo && typeof primerTipo.focus === 'function') primerTipo.focus();
            return false;
        }

        if (tipoAsistencia.value === "dias" && diasSeleccionados.length === 0) {
            if (typeof window !== 'undefined' && window.mostrarMensajeSemanas) {
                window.mostrarMensajeSemanas(`Debe seleccionar al menos un día para ${semana.nombre}.`);
            } else {
                mostrarMensajeSemanas(`Debe seleccionar al menos un día para ${semana.nombre}.`);
            }

            const primerDia = document.querySelector(`input[name="diasSemana${indice}"]`);
            if (primerDia && typeof primerDia.focus === 'function') primerDia.focus();
            return false;
        }

        haySemanaValida = true;
    }

    if (!haySemanaValida) {
        if (typeof window !== 'undefined' && window.mostrarMensajeSemanas) {
            window.mostrarMensajeSemanas("Debe seleccionar al menos una semana y completar su asistencia.");
        } else {
            mostrarMensajeSemanas("Debe seleccionar al menos una semana y completar su asistencia.");
        }

        const primerInput = DOM.contenedorSemanas ? DOM.contenedorSemanas.querySelector('input') : null;
        if (primerInput && typeof primerInput.focus === 'function') primerInput.focus();
        return false;
    }

    return true;
}
