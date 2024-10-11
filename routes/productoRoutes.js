const express = require('express');
const router = express.Router();
const {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

// Definir las rutas
router.get('/', obtenerProductos); // Ruta para obtener todos los productos
router.post('/', crearProducto); // Ruta para crear un nuevo producto
router.put('/:id', actualizarProducto); // Ruta para actualizar un producto existente
router.delete('/:id', eliminarProducto); // Ruta para eliminar un producto

module.exports = router;
