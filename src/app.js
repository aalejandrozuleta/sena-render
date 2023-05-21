const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql2')
const myconnection = require('express-myconnection')

const senaRutas = require('./rutas/senaRutas')

app.set('port', process.env.PORT || 5000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('dev'))

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'Sena1234%',
    port: 3306,
    database: 'senaRender'
}, 'single'))

app.use(express.urlencoded({
    extended: false
}))


app.use('/',senaRutas)


app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto 5000")
})