// ======================================================
// UI
// Todo lo relacionado con la interfaz
// ======================================================


// ------------------------------------------------------
// Inicializa eventos
// ------------------------------------------------------

function inicializarEventos(){

    if (DOM.esSocio) {

        DOM.esSocio.addEventListener(

            "change",

            mostrarNumeroSocio

        );

    }

    if (typeof registrarLimpiezaAutomatica === "function") {

        registrarLimpiezaAutomatica();

    }

}


// ------------------------------------------------------
// Mostrar número de socio
// ------------------------------------------------------

function mostrarNumeroSocio(){

    if (!DOM.esSocio || !DOM.grupoNumeroSocio || !DOM.numeroSocio) {

        return;

    }

    if(DOM.esSocio.value==="SI"){

        DOM.grupoNumeroSocio.style.display="block";

    }

    else{

        DOM.grupoNumeroSocio.style.display="none";

        DOM.numeroSocio.value="";

    }

}

// ======================================================
// MENSAJES
// ======================================================

function mostrarError(mensaje){

    DOM.mensajeFormulario.className =
        "mensaje-formulario mensaje-error";

    DOM.mensajeFormulario.textContent =
        mensaje;

}

function mostrarExito(mensaje){

    DOM.mensajeFormulario.className =
        "mensaje-formulario mensaje-ok";

    DOM.mensajeFormulario.textContent =
        mensaje;

}

function ocultarMensaje(){

    DOM.mensajeFormulario.className =
        "mensaje-formulario oculto";

}