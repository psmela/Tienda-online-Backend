const express = require('express');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Especifica el dominio del frontend
  credentials: true, // Permite el envío de cookies y credenciales
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// 🔹 Middleware para cookies
app.use(cookieParser());

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api', authRoutes);

module.exports = app;
