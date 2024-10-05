// routes/productoRoutes.js
const express = require('express');
const Producto = require('../models/producto'); // Importa el modelo de Producto
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find(); // Obtiene todos los productos
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
  });

  try {
    const nuevoProducto = await producto.save(); // Guarda el producto en la base de datos
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id); // Busca el producto por ID
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id); // Busca el producto por ID
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    // Actualiza los campos del producto
    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.stock = req.body.stock || producto.stock;

    const productoActualizado = await producto.save(); // Guarda los cambios
    res.json(productoActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id); // Busca el producto por ID
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    await producto.remove(); // Elimina el producto
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Exportar las rutas
module.exports = router;
