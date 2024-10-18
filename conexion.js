require('dotenv').config(); // Cargar las variables de entorno desde .env
const mongoose = require('mongoose');

// Construir la URI usando las variables del archivo .env
const dbURI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.6ztjp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

// Conectar a MongoDB sin las opciones obsoletas
mongoose.connect(dbURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a la base de datos:', err));

  




