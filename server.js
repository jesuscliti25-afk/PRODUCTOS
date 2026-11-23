var express = require('express')
var ProductosRoutes = require('./routes/producto-routes')

var app = express()

//definimos el motor de vistas
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.use('/',ProductosRoutes)

var port = process.env.port || 3000
app.listen(port,() => {
    console.log('servidor iniciado en el puerto: '+port)
})