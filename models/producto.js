const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
    },
    imagenes: [{
        type: String, // Array para almacenar múltiples URLs de imágenes
    }]
});

module.exports = mongoose.model('Producto', ProductoSchema);

