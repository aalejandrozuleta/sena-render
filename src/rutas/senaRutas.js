const express = require('express')
const rutas = express.Router()
const multer = require('multer')
const cargaImagenes = multer({
    dest: 'src/public/img'
})

const senaControlador = require('../controladores/senaControlador')

rutas.get ('/',senaControlador.zona_Index)

//instructores
rutas.get('/instructores',senaControlador.zona_instructores)
rutas.get('/registroInstructor',senaControlador.zona_registroInstructor)
rutas.get('/iniciar',senaControlador.zona_inicarUsuario)
rutas.get('/eliminarUsuario',senaControlador.zona_eliminarUuario)
rutas.get ('/cambiarClave',senaControlador.zona_cambiarClave)
//aprendiz
rutas.get('/aprendiz',senaControlador.zona_aprendiz)
rutas.get('/registroAprendiz',senaControlador.zona_registroAprendiz)

//instructores post
rutas.post('/registrarInstructor',senaControlador.zona_crearInstructor)
rutas.post('/eliminarInstructor',senaControlador.zona_eliminar)

// aprendiz post
rutas.post('/registrarAprendiz',senaControlador.zona_registrarAprendiz)

// general post
rutas.post('/cambiarClave',senaControlador.zona_cambiarClaves)
rutas.post('/iniciarSesion',senaControlador.zona_iniciar)


module.exports = rutas