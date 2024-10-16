const Producto = require('../models/producto'); // Asegúrate de que la ruta al modelo sea correcta

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

// Controlador para crear un producto
const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body); // Crea una nueva instancia del modelo
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

module.exports = {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}; // Exporta los controladores para usarlos en otras partes de la aplicación
