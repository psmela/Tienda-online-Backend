const express = require('express');
const router = express.Router();
// para Cloudinary
const upload = require('../middlewares/multerConfig'); // Importar Multer
const {
    subirImagen,
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

// Definir las rutas
router.get('/', obtenerProductos); // Ruta para obtener todos los productos
router.get('/:id', obtenerProducto)
router.post('/', crearProducto); // Ruta para crear un nuevo producto
router.put('/:id', actualizarProducto); // Ruta para actualizar un producto existente
router.delete('/:id', eliminarProducto); // Ruta para eliminar un producto
router.post('/subir-imagen', upload.single('imagen'), subirImagen);

module.exports = router;




