const express = require('express');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Especifica el dominio del frontend
  credentials: true, // Permite el envío de cookies y credenciales
}));


// Middlewares
app.use(cookieParser());
app.use(express.json());

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api', authRoutes);

module.exports = app;
