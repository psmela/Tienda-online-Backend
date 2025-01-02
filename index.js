const app = require('./app.js')
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar las variables de entorno


// Construir la URI de conexión a MongoDB Atlas
const dbURI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.6ztjp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

// Conectar a MongoDB Atlas
mongoose.connect(dbURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error conectando a la base de datos:', err));


// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
