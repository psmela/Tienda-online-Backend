const express = require('express');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

// Configurar CORS antes de las rutas
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));

// Middlewares importantes
app.use(express.json());  // 🚀 DEBE estar antes de las rutas
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api', authRoutes);

module.exports = app;
