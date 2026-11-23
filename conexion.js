var sequelize = require('sequelize')
var productoModelo = require('./models/producto')
//const producto = require('./models/producto')

//conexion con la base de datos
/*const conexion = new sequelize('Productos','root','0426Miaangel',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});*/

//pass lP98vkkVChB0f9Ep

//conexion  remota con TiDBCloud
const conexion = new sequelize('Productos','2wHixLELTdk5ntc.root','lP98vkkVChB0f9Ep',{
    host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
    port: '4000',
    dialect: 'mysql',
    dialectOptions: {
        ssl:{
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    }
});

const producto = productoModelo(conexion);

//verificamos la conexion
conexion.sync({force:false})
.then(() => {
    console.log('conectado exitosamente a la BD')
})
.catch((e) => {
    console.log('conectado exitosamente a la BD: '+e)
});

module.exports = {
    producto
}