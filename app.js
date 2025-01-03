const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const cookieParser = require('cookie-parser')
const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes.js')

const app = express();

app.use(cors()); 
// Middleware para parsear el cuerpo de la solicitud
app.use(cookieParser())
app.use(express.json()); 
app.use('/api/productos', productoRoutes);
app.use('/api',authRoutes )

module.exports = app