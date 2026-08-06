// ======================================================
// APP
// Punto de entrada
// ======================================================

window.addEventListener(

    "DOMContentLoaded",

    iniciarAplicacion

);


// ------------------------------------------------------

function cerrarConfirmacion() {

    if (DOM.confirmacion) {

        DOM.confirmacion.style.display = "none";

    }

}

function iniciarAplicacion() {

    if (DOM.contenedorSemanas) {

        crearSemanas();

    }

    inicializarEventos();

    mostrarNumeroSocio();

    if (DOM.formulario) {

        DOM.formulario.addEventListener(

            "submit",

            procesarInscripcion

        );

    }

    if (DOM.confirmacion) {

        DOM.confirmacion.addEventListener("click", (evento) => {

            if (evento.target === DOM.confirmacion) {

                cerrarConfirmacion();

            }

        });

    }

}

// ------------------------------------------------------
// Procesar inscripción
// ------------------------------------------------------

function procesarInscripcion(evento){

    evento.preventDefault();

    if(!validarFormulario()){

        return;

    }

    const datos = obtenerDatosFormulario();

    const datosEnvio = {

        ...datos,

        numeroInscripcion: generarNumeroInscripcion(),

        fechaInscripcion: obtenerFechaActual()

    };

    console.log("Inscripción enviada:", datosEnvio);

    if (DOM.confirmacion) {

        DOM.confirmacion.style.display = "flex";

        const semanasTexto = datosEnvio.asistencia.map((semana) => {

            const nombreSemana = CONFIG.semanas.find(item => item.id === semana.semana)?.nombre || `Semana ${semana.semana}`;

            const diasTexto = semana.dias.length > 0 ? ` (${semana.dias.join(", ")})` : "";

            return `<li>${nombreSemana} — ${semana.tipo === "dias" ? "Días sueltos" : "Semana completa"}${diasTexto}</li>`;

        }).join("");

        DOM.confirmacion.innerHTML = `

            <div class="confirmacion-card">

                <button class="btn-cerrar" type="button" aria-label="Cerrar confirmación">×</button>

                <h2>✅ Inscripción enviada</h2>

                <p><strong>N° de inscripción:</strong> ${datosEnvio.numeroInscripcion}</p>

                <p><strong>Fecha:</strong> ${datosEnvio.fechaInscripcion}</p>

                <p><strong>Alumno:</strong> ${datosEnvio.alumno.nombre} ${datosEnvio.alumno.apellido}</p>

                <p><strong>Responsable:</strong> ${datosEnvio.responsable.nombre}</p>

                <div class="semanas-confirmadas">

                    <h3>Semanas inscritas</h3>

                    <ul>${semanasTexto}</ul>

                </div>

                <div class="acciones">

                    <button class="btn-aceptar" type="button">Aceptar</button>

                </div>

            </div>

        `;

        DOM.confirmacion.querySelector('.btn-cerrar')?.addEventListener('click', cerrarConfirmacion);
        DOM.confirmacion.querySelector('.btn-aceptar')?.addEventListener('click', cerrarConfirmacion);

    }

    DOM.formulario.reset();

    mostrarNumeroSocio();

    crearSemanas();

}