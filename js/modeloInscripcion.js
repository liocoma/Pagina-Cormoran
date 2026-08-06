// ======================================================
// MODELO DE INSCRIPCIÓN
// Este archivo define exactamente cómo será una inscripción.
// ======================================================

const inscripcion = {

    numero: "",

    fecha: "",

    alumno: {

        nombre: "",

        apellido: "",

        dni: "",

        fechaNacimiento: "",

        edad: 0,

        socio: false,

        numeroSocio: ""

    },

    responsable: {

        nombre: "",

        telefono: "",

        email: ""

    },

    autorizacion: {

        retiroSolo: false,

        autorizados: []

    },

    asistencia: {

        semanas: []

    },

    observaciones: "",

    estado: "Pendiente"

};