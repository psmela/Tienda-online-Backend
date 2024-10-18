const express = require('express');
const mongoose = require('mongoose');
const productoRoutes = require('./routes/productoRoutes');
const cors = require('cors'); // Importa el paquete cors
require('dotenv').config(); // Cargar las variables de entorno

const app = express();


app.use(cors()); 

// Middleware para parsear el cuerpo de la solicitud
app.use(express.json()); 

// Construir la URI de conexión a MongoDB Atlas
const dbURI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.6ztjp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

// Conectar a MongoDB Atlas
mongoose.connect(dbURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error conectando a la base de datos:', err));

// Usar las rutas de productos
app.use('/api/productos', productoRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
