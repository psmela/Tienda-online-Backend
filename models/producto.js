const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    precio: { 
        type: Number, 
        required: true 
    },
    categoria: { 
        type: String, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    descripcion: { 
        type: String, 
        required: true 
    }
}, { timestamps: true }); // Agrega timestamps para registrar automáticamente la creación y actualización

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
