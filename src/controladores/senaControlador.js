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

//instructores
controlador.zona_instructores = (consulta, respuesta) => {
	respuesta.render("instructores");
};

controlador.zona_inicarUsuario = (consulta, respuesta) => {
    respuesta.render('iniciarusuarios')
};

//aprendiz

controlador.zona_aprendiz = (consulta,respuesta)=> {
    respuesta.render('aprendiz')
};


controlador.zona_registroAprendiz = (consulta, respuesta) => {
    consulta.getConnection((error, conexion) => {
        if (error) {
            respuesta.json(error);
        }
        conexion.query('SELECT * FROM cursos', (error, cursos) => {
            if (error) {
                respuesta.json(error);
            }
            respuesta.render('registrarAprendiz', {
                cursos: cursos
            });
        });
    });
};








//general
controlador.zona_eliminarUuario = (consulta,respuesta)=> {
    respuesta.render('eliminarUsuario')
};


controlador.zona_cambiarClave = (consulta,respuesta)=> {
    respuesta.render('CambiarClave')
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

controlador.zona_iniciar = ((consulta,respuesta)=>{
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
                respuesta.redirect("/iniciar")
            }
        })
    })
});


controlador.zona_eliminar = ((consulta,respuesta)=> {
    let correo = consulta.body.correo;
    let contrasena = consulta.body.contrasena;
    let id = consulta.body.cedula;

    consulta.getConnection((error,conexion)=>{
        conexion.query('delete from registro where correo = ? and contrasena = ? and cedula = ?',[correo,contrasena,id],(error,eliminar)=>{
            respuesta.redirect('/')
        })
    })
})


controlador.zona_cambiarClaves = ((consulta, respuesta) => {
    let correo = consulta.body.correo;
    let id = consulta.body.cedula;
    let contrasena = consulta.body.contrasena;

    consulta.getConnection((error, conexion) => {
        conexion.query('SELECT * FROM registro WHERE correo = ? AND cedula = ?', [correo, id], (error, resultadoConsulta) => {
            if (error) {
                console.log(error);
            } else {
                conexion.query('UPDATE registro SET contrasena = ? WHERE correo = ? AND cedula = ?', [contrasena, correo, id], (error, resultadoActualizacion) => {
                    respuesta.redirect("/");
                });
            }
        });
    });
});
// fin insructores

// aprendiz

controlador.zona_registrarAprendiz = ((consulta,respuesta)=> {
    let registrarse = consulta.body
    console.log(registrarse);
    consulta.getConnection((error,conexion)=>{
        conexion.query ('insert into registro set ?, tipoUsuarios_fk = 2 ',[registrarse],(error,registro)=>{
            respuesta.redirect("/")
        });
    });
});






module.exports = controlador;
