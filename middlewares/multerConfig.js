const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Verificar si la carpeta 'uploads' existe, si no, crearla
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Crea la carpeta y subcarpetas si no existen
}

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Usar la carpeta 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
