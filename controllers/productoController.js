const Producto = require('../models/producto.js'); 
const User = require('../models/user.js')
const fs = require('fs');
const cloudinary = require('../middlewares/cloudinary.js');
const { log } = require('console');


// Controlador para obtener productos con filtros de categoría y precio
const obtenerProductos = async (req, res) => {
    try {
        const { categoria, precioMin, precioMax } = req.query;
        let filtros = {};

        if (categoria) {
            filtros.categoria = categoria;
        }

        if (precioMin || precioMax) {
            filtros.precio = {};
            if (precioMin) filtros.precio.$gte = parseFloat(precioMin);
            if (precioMax) filtros.precio.$lte = parseFloat(precioMax);
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
    const {nombre, categoria, descripcion, precio, stock } = req.body;

    try {
        let imagenes = [];

        // Verificar si hay archivos adjuntos
        if (req.files && req.files.length > 0) {
            // Subir cada imagen a Cloudinary
            for (let i = 0; i < req.files.length; i++) {
                try {
                    const result = await cloudinary.uploader.upload(req.files[i].path, {folder: 'productos_tienda'});
                    imagenes.push(result.public_id); // Guardar la URL segura de la imagen subida a Cloudinary
                } catch (uploadError) {
                    console.error(`Error subiendo imagen ${i + 1}:`, uploadError);
                    return res.status(500).json({ message: "Error subiendo imágenes" });
                }
            }
        }

        // Crear el nuevo producto con las URLs de las imágenes
        const nuevoProducto = new Producto({
            nombre,
            precio,
            categoria,
            stock,
            descripcion,
            imagenes, // Guardar las URLs de las imágenes en el campo 'imagenes'
        });
        for(let i = 0; i < req.files.length; i++ ){
            fs.unlinkSync(req.files[i].path);
        }
        await nuevoProducto.save(); // Guardar el producto en la base de datos
        console.log("producto creado")
        res.status(201).json({ message: "Producto creado", producto: nuevoProducto });
    } catch (error) {
        console.error("Error de base de datos:", error);
        res.status(500).json({ message: "Error creando producto" });
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
        const productoEliminado = await Producto.findById(id); 
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" }); // Si no se encuentra el producto
        }
    const imagenes = productoEliminado.imagenes; // Suponiendo que almacenas un array de `public_id`

    if (imagenes && imagenes.length > 0) {
      for (const publicId of imagenes) {
        try {
          await cloudinary.uploader.destroy(publicId); // Eliminar cada imagen por `public_id`
          console.log(`Imagen con ID ${publicId} eliminada de Cloudinary`);
        } catch (error) {
          console.error(`Error al eliminar imagen con ID ${publicId}:`, error.message);
        }
      }
    }   
    await User.updateMany(
        { "carrito.product": id },
        { $pull: { carrito: { product: id } } }
    );
        await productoEliminado.deleteOne()
        console.log("producto eliminado");
        res.status(200).json({ message: "Producto eliminado", producto: productoEliminado }); // Respuesta exitosa
    } catch (error) {
        console.error("Error de base de datos:", error); // Log para errores específicos
        res.status(500).json({ message: "Error eliminando producto" }); 
    }
};



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};







