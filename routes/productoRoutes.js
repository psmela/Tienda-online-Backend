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

// para Cloudinary
const { subirImagen } = require('../controllers/productosController'); // Controlador para manejar la subida
const upload = require('../middlewares/multerConfig'); // Importar Multer

// Ruta para subir imágenes de productos
router.post('/subir-imagen', upload.single('imagen'), subirImagen);

module.exports = router;

