// ======================================================
// CONFIGURACIÓN GENERAL DEL SISTEMA
// Este archivo NUNCA va a tocar el HTML. Solo información.
// ======================================================

const CONFIG = {

    escuela: {

        nombre: "Cormorán Escuela Náutica",

        temporada: "Invierno 2026"

    },

    turnos: [

        {
            id: "pre",

            nombre: "Pre Turno",

            horario: "11:00 - 14:00"
        },

        {
            id: "manana",

            nombre: "Turno Mañana",

            horario: "09:00 - 12:30"
        },

        {
            id: "tarde",

            nombre: "Turno Tarde",

            horario: "14:00 - 17:30"
        }

    ],

    semanas: [

        {

            id:1,

            nombre:"Semana 1",

            fecha:"21 al 25 de Julio",

            dias:[

                {
                    id:1,
                    nombre:"Lunes",
                    fecha:"21/07"
                },

                {
                    id:2,
                    nombre:"Martes",
                    fecha:"22/07"
                },

                {
                    id:3,
                    nombre:"Miércoles",
                    fecha:"23/07"
                },

                {
                    id:4,
                    nombre:"Jueves",
                    fecha:"24/07"
                },

                {
                    id:5,
                    nombre:"Viernes",
                    fecha:"25/07"
                }

            ]

        },

        {

            id:2,

            nombre:"Semana 2",

            fecha:"28 de Julio al 1 de Agosto",

            dias:[

                {
                    id:1,
                    nombre:"Lunes",
                    fecha:"28/07"
                },

                {
                    id:2,
                    nombre:"Martes",
                    fecha:"29/07"
                },

                {
                    id:3,
                    nombre:"Miércoles",
                    fecha:"30/07"
                },

                {
                    id:4,
                    nombre:"Jueves",
                    fecha:"31/07"
                },

                {
                    id:5,
                    nombre:"Viernes",
                    fecha:"01/08"
                }

            ]

        }

    ]

};