var router = require('express').Router()
var {producto} = require('../conexion')

//ruta raiz
router.get('/',(req,res) => {
    res.render('pages/index')
})

//ruta para mostrar la pagina insrtar
router.get('/insertarProducto',(req,res) => {
    res.render('pages/insertarProducto')
})

//ruta o peticion para guardar un producto nuevo en la DB
router.post('/guardarProducto',(req,res) => {
    producto.create(req.body)
    .then(() => {
        console.log('se inserto correctamente');
        res.redirect('/listarRegistros');
    })
    .catch((e) => {
        res.status(400).send('Error al instalar: '+e)
    })
})

//ruta para obtener la lista de productos y enviarlos a la pagina
router.post('/guardarProducto',(req,res) => {
    producto.findAll()
    .then((data) => {
        res.render('pages/listarRegistros', {productos: data});
    })
    .catch((e) => {
        console.log('Error en la consulta: '+e)
    })
})

//ruta para buscar un producto por su id
router.get('/buscarProducto/idProducto',(req,res) => {
    res.findAll({
        where: {
            idProducto:req.params.idProducto
        }
    })
    .then ((data) => {
        console.log(data)
        res.render('pages/modificarProducto',{producto:data})
    })
})

//ruta o peticion para modificar un producto existente
router.post('/modificarProducto',(req,res) => {
    var idProducto =req.body.idProducto;
    const productoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto
    }
    producto.update(productoModificado, {
        where: {
            idProducto: idProducto
        }
    })
    .then(() => {
        res.redirect('/listarProductos')
    })
    .catch((e) => {
        console.log('Error al modificar: '+e)
    })
})

//ruta o peticion para eliminar un producto
router.get('/eliminarProducto/:idProducto', (req, res) => {
    producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
    .then(() => {
        res.redirect('/listarProductos')
    })
    .catch((e) => {
        res.status(400).send('Error al eliminar: '+e)
    })
})

module.exports = router;