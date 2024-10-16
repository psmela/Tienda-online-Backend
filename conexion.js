require('dotenv').config(); // Cargar las variables de entorno desde .env
const mongoose = require('mongoose');

// Construir la URI usando las variables del archivo .env
const dbURI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.6ztjp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

// Conectar a MongoDB sin las opciones obsoletas
mongoose.connect(dbURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a la base de datos:', err));

  //Configuración de Cloudinary
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;

