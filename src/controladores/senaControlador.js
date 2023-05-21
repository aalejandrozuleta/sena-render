const controlador = {};

const { Console, error, log } = require("console");
const { query } = require("express");
const connection = require("express-myconnection");
const fs = require("fs");
const { get } = require("http");
const multer = require("multer");
const storage = require("node-storage");
const store = new storage("../public/store");

controlador.zona_Index = (consulta, respuesta) => {
	respuesta.render("index");
};

controlador.zona_instructores = (consulta, respuesta) => {
	respuesta.render("instructores");
};
controlador.zona_registroInstructor = (consulta, respuesta) => {
    consulta.getConnection((error, conexion) => {
        if (error) {
            respuesta.json(error);
        }

        conexion.query('SELECT * FROM cursos', (error, cursos) => {
            if (error) {
                respuesta.json(error);
            }
            console.log(cursos);

            conexion.query('SELECT * FROM horarios', (error, horarios) => {
                if (error) {
                    respuesta.json(error);
                }
                console.log(horarios);

                respuesta.render('registrarInstructor', {
                    cursos: cursos,
                    horarios: horarios
                });
            });
        });
    });
};


//operaciones

// controlador.zona_crearInstructor = ((consulta,respuesta)=> {
//     let registrarse = consulta.body
//     console.log(registrarse);

//     consulta.getConnection((error,conexion)=>{
//         conexion.query ('insert into registro set ?, tipoUsuarios = 1 ',[registrarse],(error,registro)=>{
//             respuesta.redirect("/")
//         })
//     })
// })

controlador.zona_crearInstructor = ((consulta,respuesta)=> {
    let registrarse = consulta.body
    console.log(registrarse);

    consulta.getConnection((error,conexion)=>{
        conexion.query ('insert into registro set ?, tipoUsuarios_fk = 1 ',[registrarse],(error,registro)=>{
            respuesta.redirect("/")
        })
    })
})

module.exports = controlador;
