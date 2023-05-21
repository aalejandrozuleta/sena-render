const express = require('express')
const rutas = express.Router()
const multer = require('multer')
const cargaImagenes = multer({
    dest: 'src/public/img'
})

const senaControlador = require('../controladores/senaControlador')

rutas.get ('/',senaControlador.zona_Index)
rutas.get('/instructores',senaControlador.zona_instructores)
rutas.get('/registroInstructor',senaControlador.zona_registroInstructor)
rutas.get('/inicarInstructor',senaControlador.zona_inicarInstructores)
rutas.get('/eliminarUsuario',senaControlador.zona_eliminarUuario)
rutas.get ('/cambiarClave',senaControlador.zona_cambiarClave)


rutas.post('/iniciarSesion',senaControlador.zona_iniciarInstructor)
rutas.post('/registrarInstructor',senaControlador.zona_crearInstructor)
rutas.post('/eliminarInstructor',senaControlador.zona_eliminar)
rutas.post('/cambiarClave',senaControlador.zona_cambiarClaves)
module.exports = rutas