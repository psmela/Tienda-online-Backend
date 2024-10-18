const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    categoria:{
        type: String,
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    carrito: {
        type: Boolean,
        default: false
    },
    imagenes: [{
        type: String, // Array para almacenar múltiples URLs de imágenes
    }]
});

module.exports = mongoose.model('Producto', ProductoSchema);

