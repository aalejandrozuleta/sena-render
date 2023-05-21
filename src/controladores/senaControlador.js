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

controlador.zona_inicarInstructores = (consulta, respuesta) => {
    respuesta.render('iniciarInstructor')
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


// instructores
controlador.zona_crearInstructor = ((consulta,respuesta)=> {
    let registrarse = consulta.body
    console.log(registrarse);
    consulta.getConnection((error,conexion)=>{
        conexion.query ('insert into registro set ?, tipoUsuarios_fk = 1 ',[registrarse],(error,registro)=>{
            respuesta.redirect("/")
        });
    });
});

controlador.zona_iniciarInstructor = ((consulta,respuesta)=>{
    let correo =consulta.body.correo
    let contrasena =consulta.body.contrasena
    console.log(correo);
    console.log(contrasena);
    consulta.getConnection((error,conexion)=>{
        conexion.query('select * from registro where correo=? and contrasena=?',[correo, contrasena],(error,registro)=>{
            console.log(registro)
            if (registro.length !== 0) {
                let correo = consulta.body.correo
                store.put('correo',correo)
                console.log(store.get('correo'));
                console.log(error);
                respuesta.redirect("/")
            }
            else {
                console.log(error);
                respuesta.redirect("/inicarInstructor")
            }
        })
    })
});




// fin insructore


module.exports = controlador;
