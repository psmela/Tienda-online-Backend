const mongoose = require('mongoose');

// Definir el esquema del producto
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  stock: { type: Number, required: true }
});

// Crear y exportar el modelo Producto
module.exports = mongoose.model('Producto', productoSchema);
