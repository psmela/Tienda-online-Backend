const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const cookieParser = require('cookie-parser')
const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes.js')

const app = express();

import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173', // Especifica el dominio del frontend
  credentials: true, // Permite el envío de cookies y credenciales
}));

// Middleware para parsear el cuerpo de la solicitud
app.use(cookieParser())
app.use(express.json()); 
app.use('/api/productos', productoRoutes);
app.use('/api',authRoutes )

module.exports = app