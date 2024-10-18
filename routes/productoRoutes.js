const express = require('express');
const router = express.Router();
// para Cloudinary
const upload = require('../middlewares/multerConfig'); // Importar Multer
const {
    subirImagen,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

// Definir las rutas
router.get('/', obtenerProductos); // Ruta para obtener productos con filtros de búsqueda
router.post('/', crearProducto); // Ruta para crear un nuevo producto
router.put('/:id', actualizarProducto); // Ruta para actualizar un producto existente
router.delete('/:id', eliminarProducto); // Ruta para eliminar un producto
router.post('/subir-imagen', upload.single('imagen'), subirImagen); // Ruta para subir imágenes a Cloudinary

module.exports = router;




