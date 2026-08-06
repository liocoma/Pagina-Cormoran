// ======================================================
// FORMULARIO
// Lee el formulario y genera los bloques dinámicos
// ======================================================

// ------------------------------------------------------
// Crear las semanas de inscripción
// ------------------------------------------------------

function crearSemanas() {

    DOM.contenedorSemanas.innerHTML = "";

    CONFIG.semanas.forEach((semana, indice) => {

        const tarjeta = document.createElement("details");

        tarjeta.classList.add("semana-card");

        if (indice === 0) {

            tarjeta.setAttribute("open", "");

        }

        tarjeta.innerHTML = `

            <summary class="cabecera-semana">

                <h3>${semana.nombre}</h3>

                <span>${semana.fecha}</span>

            </summary>

            <div class="contenido-semana">

            <!-- ========================= -->
            <!-- TURNOS -->
            <!-- ========================= -->

            <div class="bloque-turnos">

                <h4>Turnos</h4>

                ${CONFIG.turnos.map(turno => `

                    <label>

                        <input
                            type="checkbox"
                            name="turnosSemana${indice}"
                            value="${turno.id}">

                        ${turno.nombre}

                    </label>

                `).join("")}

            </div>

            <!-- ========================= -->
            <!-- FORMA DE ASISTENCIA -->
            <!-- ========================= -->

            <div class="bloque-asistencia">

                <h4>Forma de asistencia</h4>

                <label>

                    <input
                        type="radio"
                        name="tipoAsistencia${indice}"
                        value="completa">

                    Semana completa

                </label>

                <label>

                    <input
                        type="radio"
                        name="tipoAsistencia${indice}"
                        value="dias">

                    Días sueltos

                </label>

            </div>

            <!-- ========================= -->
            <!-- DÍAS (SE GENERAN CON JS) -->
            <!-- ========================= -->

            <div
                class="dias-semana"
                id="dias${indice}">
            </div>

            </div>

        `;

        DOM.contenedorSemanas.appendChild(tarjeta);

    });

    inicializarEventosSemanas();

}

// ------------------------------------------------------
// Eventos de las semanas
// ------------------------------------------------------

function inicializarEventosSemanas() {

    const radios =
        document.querySelectorAll('input[name^="tipoAsistencia"]');

    radios.forEach(radio => {

        radio.addEventListener("change", cambiarTipoAsistencia);

    });

}

// ------------------------------------------------------
// Mostrar/Ocultar días
// ------------------------------------------------------

function cambiarTipoAsistencia(evento) {

    const radio = evento.target;

    const numeroSemana =
        radio.name.replace("tipoAsistencia", "");

    const contenedorDias =
        document.getElementById(`dias${numeroSemana}`);

    contenedorDias.innerHTML = "";

    if (radio.value !== "dias") {

        return;

    }

    CONFIG.semanas[numeroSemana].dias.forEach(dia => {

        contenedorDias.innerHTML += `

            <label class="dia-item">

                <input
                    type="checkbox"
                    name="diasSemana${numeroSemana}"
                    value="${dia.id}">

                ${dia.nombre} (${dia.fecha})

            </label>

        `;

    });

}

// ------------------------------------------------------
// Devuelve todos los datos del formulario
// ------------------------------------------------------

function obtenerDatosFormulario(){

    return{

        alumno:obtenerAlumno(),

        responsable:obtenerResponsable(),

        asistencia:obtenerSemanasSeleccionadas(),

        observaciones: DOM.observaciones ? DOM.observaciones.value.trim() : ""

    };

}

// ------------------------------------------------------
// Alumno
// ------------------------------------------------------

function obtenerAlumno(){

    return{

        nombre: DOM.nombreAlumno.value.trim(),

        apellido: DOM.apellidoAlumno.value.trim(),

        dni: DOM.dniAlumno.value.trim(),

        fechaNacimiento: DOM.fechaNacimiento.value,

        socio: DOM.esSocio.value,

        numeroSocio: DOM.numeroSocio.value.trim()

    };

}

// ------------------------------------------------------
// Responsable
// ------------------------------------------------------

function obtenerResponsable(){

    return{

        nombre: DOM.nombreResponsable.value.trim(),

        telefono: DOM.telefonoResponsable.value.trim(),

        email: DOM.emailResponsable.value.trim()

    };

}

// ------------------------------------------------------
// Obtener semanas seleccionadas
// ------------------------------------------------------

function obtenerSemanasSeleccionadas(){

    const semanasSeleccionadas = [];

    CONFIG.semanas.forEach((semana, indice)=>{

        const semanaActual={

            semana:semana.id,

            turnos:[],

            tipo:"",

            dias:[]

        };

        // -----------------------------
        // Turnos
        // -----------------------------

        document
            .querySelectorAll(
                `input[name="turnosSemana${indice}"]:checked`
            )
            .forEach(turno=>{

                semanaActual.turnos.push(turno.value);

            });

        // -----------------------------
        // Tipo de asistencia
        // -----------------------------

        const tipo=document.querySelector(

            `input[name="tipoAsistencia${indice}"]:checked`

        );

        if(tipo){

            semanaActual.tipo=tipo.value;

        }

        // -----------------------------
        // Días
        // -----------------------------

        document
            .querySelectorAll(
                `input[name="diasSemana${indice}"]:checked`
            )
            .forEach(dia=>{

                semanaActual.dias.push(Number(dia.value));

            });

        // -----------------------------

        if(

            semanaActual.turnos.length>0 ||

            semanaActual.tipo!=="" ||

            semanaActual.dias.length>0

        ){

            semanasSeleccionadas.push(semanaActual);

        }

    });

    return semanasSeleccionadas;

}