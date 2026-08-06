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

function calcularEdad(fechaNacimiento) {

    if (!fechaNacimiento) return "";

    const fecha = new Date(fechaNacimiento);

    if (Number.isNaN(fecha.getTime())) return "";

    const hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear();

    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {

        edad--;

    }

    return `${edad} ${edad === 1 ? "año" : "años"}`;

}

function formatearMoneda(valor) {

    return new Intl.NumberFormat("es-AR", {

        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0

    }).format(valor);

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

            const nombreSemana =
                CONFIG.semanas.find(item => item.id === semana.semana)?.nombre
                || `Semana ${semana.semana}`;

            const turnosHtml = semana.turnos.length > 0
                ? semana.turnos
                    .map(turnoId => {

                        const turnoNombre = CONFIG.turnos.find(
                            turno => turno.id === turnoId
                        )?.nombre || turnoId;

                        return `<div class="detalle-resumen">• ${turnoNombre}</div>`;

                    })
                    .join("")
                : "";

            let diasHtml = "";

            if (semana.tipo === "dias") {

                const semanaConfig =
                    CONFIG.semanas.find(item => item.id === semana.semana);

                diasHtml = semana.dias
                    .map(idDia => {

                        const dia = semanaConfig.dias.find(d => d.id === idDia);

                        return `<div class="detalle-resumen detalle-dias">• ${dia.nombre} ${dia.fecha}</div>`;

                    })
                    .join("");

            }

            return `
                <li class="item-semana-resumen">
                    <div class="titulo-semana-resumen">✔ ${nombreSemana}</div>
                    ${turnosHtml}
                    <div class="detalle-resumen">${semana.tipo === "dias" ? "Días sueltos" : "Semana completa"}</div>
                    ${diasHtml}
                </li>
            `;

        }).join("");

        const edadTexto = calcularEdad(datosEnvio.alumno.fechaNacimiento);

        const montoTotal = datosEnvio.asistencia.length * 15000;

        DOM.confirmacion.innerHTML = `

            <div class="confirmacion-card">

                <button class="btn-cerrar" type="button" aria-label="Cerrar confirmación">×</button>

                <div class="confirmacion-header">

                    <div class="confirmacion-icon">✓</div>

                    <div>
                        <h2>Inscripción confirmada</h2>
                        <p class="confirmacion-subtitulo">Tu reserva quedó registrada correctamente.</p>
                    </div>

                </div>

                <div class="confirmacion-body">

                    <section class="bloque-resumen">

                        <h3>INSCRIPCIÓN Nº ${datosEnvio.numeroInscripcion}</h3>

                        <div class="fila-resumen">
                            <span>Fecha</span>
                            <strong>${datosEnvio.fechaInscripcion}</strong>
                        </div>

                        <div class="fila-resumen">
                            <span>Alumno</span>
                            <strong>${datosEnvio.alumno.nombre} ${datosEnvio.alumno.apellido}</strong>
                        </div>

                        ${edadTexto ? `
                            <div class="fila-resumen">
                                <span>Edad</span>
                                <strong>${edadTexto}</strong>
                            </div>
                        ` : ""}

                        <div class="fila-resumen">
                            <span>Responsable</span>
                            <strong>${datosEnvio.responsable.nombre}</strong>
                        </div>

                    </section>

                    <section class="bloque-resumen">

                        <h3>Semanas elegidas</h3>

                        <ul class="lista-semanas">${semanasTexto}</ul>

                        <div class="resumen-total">
                            <span>Total de semanas</span>
                            <strong>${datosEnvio.asistencia.length}</strong>
                        </div>

                        <div class="resumen-total monto">
                            <span>Monto total a abonar</span>
                            <strong>${formatearMoneda(montoTotal)}</strong>
                        </div>

                    </section>

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