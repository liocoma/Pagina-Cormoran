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