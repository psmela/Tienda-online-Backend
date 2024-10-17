const Producto = require('../models/producto'); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Controlador para obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find(); // Busca todos los productos
        res.status(200).json(productos); // Responde con la lista de productos
    } catch (error) {
        console.error(error); // Muestra el error en la consola
        res.status(500).json({ message: "Error obteniendo productos" }); // Respuesta de error
    }
};

const obtenerProducto = async (req, res) => {
    const id = req.params.id
    try {
        const producto = await Producto.findById(id)
        res.status(200).json(producto)
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error obteniendo productos" });
    }
}

// Controlador para crear un producto
const crearProducto = async (req, res) => {
    const {nombre, categoria, descripcion, precio, stock} = req.body
    try {
        let imagenes = [];

        // Subir cada imagen a Cloudinary y almacenar la URL en el array 'imagenes'
        for (let i = 0; i < req.files.length; i++) {
            const result = await cloudinary.uploader.upload(req.files[i].path, {
                folder: 'productos_tienda', // Carpeta en Cloudinary
            });
            imagenes.push(result.secure_url); // Añadir la URL de la imagen al array
        }
        const nuevoProducto = new Producto({
            nombre,
            precio,
            categoria,
            stock,
            descripcion,
            imagenes
        }); // Crea una nueva instancia del modelo
        await nuevoProducto.save(); // Guarda el producto en la base de datos
        res.status(201).json({ message: "Producto creado", producto: nuevoProducto }); // Respuesta exitosa
    } catch (error) {
        console.error("Error de base de datos:", error); // Log para errores específicos
        res.status(500).json({ message: "Error creando producto" }); // Respuesta de error
    }
};

// Controlador para actualizar un producto, incluyendo el campo 'carrito'
const actualizarProducto = async (req, res) => {
    const { id } = req.params; // Obtenemos el ID del producto de los parámetros de la URL
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // Actualiza el producto
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" }); // Si no se encuentra el producto
        }
        res.status(200).json({ message: "Producto actualizado", producto: productoActualizado }); // Respuesta exitosa
    } catch (error) {
        console.error("Error de base de datos:", error); // Log para errores específicos
        res.status(500).json({ message: "Error actualizando producto" }); // Respuesta de error
    }
};

// Controlador para eliminar un producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params; // Obtenemos el ID del producto de los parámetros de la URL
    try {
        const productoEliminado = await Producto.findByIdAndDelete(id); // Elimina el producto
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" }); // Si no se encuentra el producto
        }
        res.status(200).json({ message: "Producto eliminado", producto: productoEliminado }); // Respuesta exitosa
    } catch (error) {
        console.error("Error de base de datos:", error); // Log para errores específicos
        res.status(500).json({ message: "Error eliminando producto" }); // Respuesta de error
    }
};

//Función para subir imágenes a Cloudinary
const cloudinary = require('../conexion'); 

// Subir imagen a Cloudinary
const subirImagen = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'tiendaOnline', // carpeta creada en Cloudinary
    });

    // El resultado contiene información sobre la imagen subida
    console.log(result);

    // Guarda la URL de la imagen en tu base de datos o úsala según sea necesario
    res.json({ message: 'Imagen subida correctamente', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir la imagen', error });
  }
};

module.exports = {
    subirImagen,
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}; // Exporta los controladores para usarlos en otras partes de la aplicación






