const express = require('express');
const router = express.Router();

// Ruta para obtener todos los productos (GET)
router.get('/', (req, res) => {
  try {
    res.status(200).send('obteniendo los productos')
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message);
    
  }
});

// Ruta para agregar un nuevo producto (POST)
router.post('/', (req, res) => {
  const producto = req.body;  // Obtenemos el producto del cuerpo de la solicitud
  console.log(producto);
  res.send('Producto agregado con éxito');
});

module.exports = router;
