const controlador = {}

const { Console, error, log } = require('console')
const { query } = require('express')
const connection = require('express-myconnection')
const fs = require('fs')
const { get } = require('http')
const multer = require('multer')
const storage = require('node-storage')
const store = new storage ('../public/store')

controlador.zona_Index = (consulta,respuesta)=> {
    respuesta.render ('index')
}

controlador.zona_instructores = (consulta,respuesta)=> {
    respuesta.render('instructores')
}

controlador.zona_registroInstructor = (consulta,respuesta)=> {
    respuesta.render('registrarInstructor')
}


module.exports = controlador