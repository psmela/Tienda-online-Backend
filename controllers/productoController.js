const Producto = require('../models/producto'); 

// Controlador para obtener productos con filtros de categoría y precio
const obtenerProductos = async (req, res) => {
    try {
        const { categoria, precioMin, precioMax } = req.query; // Obtener los parámetros de la solicitud (query)

        // Crear el objeto de filtros
        let filtros = {};

        // Si se ha enviado una categoría, añadirla al filtro
        if (categoria) {
            filtros.categoria = categoria;
        }

        // Si se ha enviado un precio mínimo, añadirlo al filtro
        if (precioMin) {
            filtros.precio = { ...filtros.precio, $gte: parseFloat(precioMin) }; // $gte es "mayor o igual"
        }

        // Si se ha enviado un precio máximo, añadirlo al filtro
        if (precioMax) {
            filtros.precio = { ...filtros.precio, $lte: parseFloat(precioMax) }; // $lte es "menor o igual"
        }

        // Buscar productos que coincidan con los filtros
        const productos = await Producto.find(filtros);

        // Responder con la lista de productos filtrados
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo productos" });
    }
};

// Controlador para crear un producto
const crearProducto = async (req, res) => {
    const {nombre, categoria, descripcion, precio, stock} = req.body;
    try {
        const nuevoProducto = new Producto({
            nombre,
            precio,
            categoria,
            stock,
            carrito,
            descripcion
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
        res.status(500).json({ message: "Error eliminando producto" }); 
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
    crearProducto,
    actualizarProducto,
    eliminarProducto
};







