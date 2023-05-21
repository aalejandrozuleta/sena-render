const express = require('express')
const rutas = express.Router()
const multer = require('multer')
const cargaImagenes = multer({
    dest: 'src/public/img'
})

const senaControlador = require('../controladores/senaControlador')

rutas.get ('/',senaControlador.zona_Index)
rutas.get('/instructores',senaControlador.zona_instructores)


module.exports = rutas