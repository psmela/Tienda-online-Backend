const express = require('express');
const app = express();
const port = 3000;
const conexion = require("./conexion.js");
const productoRoutes = require('./routes/productoRoutes.js');

app.use(express.json()); // Para que el servidor pueda manejar JSON en solicitudes POST

// Aquí está la ruta de los productos
app.use(productoRoutes);

async function main() {
  try {
    await conexion;
    console.log("Conexión a MongoDB exitosa");
    app.listen(port, () => {
      console.log("Servidor escuchando en el puerto:", port);
    });
  } catch (error) {
    console.log(error.message);
  }
}

main();
