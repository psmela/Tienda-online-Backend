const User = require('../models/user.js')
const Producto = require('../models/producto.js')
const bcrypt = require('bcryptjs')
const {loginSchema} = require('../schemas/auth.schema.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const CreateAccesToken = require('../libs/jwt.js')



const getUsers = async (req, res) =>{
    try {
       const Users = await User.find() 
       res.status(200).json(Users)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const register = async (req, res)=>{ 
    const {userName, email, password} = req.body
    try {
       const UserGmail = await User.findOne({email})
       if(UserGmail){
        return res.status(400).json({message: 'el email ya esta en uso'})
       }
        
       const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            userName,
            email,
            password: passwordHash
        })
     const userSaved = await newUser.save()
     const token = await CreateAccesToken({id: userSaved._id})
     res.cookie("token", token)
     res.status(201).json({message: "usuario creado"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res)=>{
    const parsedData = loginSchema.parse(req.body);
    const {email, password} = parsedData
    try {
        const findUser = await User.findOne({email})
        if(!findUser){
            return res.status(400).json({message: "usuario no encontrado"})
        }
       const matchPassword = await bcrypt.compare(password, findUser.password)
       if(!matchPassword) return res.status(400).json({message: "contraseña incorrecta"})
    
     const token = await CreateAccesToken({id: findUser._id})
     res.cookie("token", token)
     res.status(200).json({
        id: findUser._id,
        userName: findUser.userName,
        email: findUser.email,
        carrito: findUser.carrito
     })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logout = (req, res) =>{
  res.cookie('token', "", {expires: new Date(0)})
  return res.status(200).json({message: "sesion cerrada"})
}

const getProfile = async (req, res)=>{
 const FoundUser = await User.findById(req.user.id)
 if (!FoundUser) return res.status(400).json({message: "usuario no encontrado"})
 res.json({
  id: FoundUser._id,
  userName: FoundUser.userName,
  email: FoundUser.email,
  carrito: FoundUser.carrito

})

}

const verifyToken = async (req, res) =>{
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "no autorizado"})
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user)=>{
       if (err) return res.status(401).json({message: "no autorizado"})
       const userFound = await User.findById(user.id); 
       if(!userFound) return res.status(401).json({message: "no autorizado"})
       res.json({
       id: userFound._id,
       userName: userFound.userName,
       email: userFound.email,
       carrito: userFound.carrito

       })
    })
}

    //añadir al carrito
    const addProduct = async (req, res) =>{
        const { userId } = req.params
        const { productoId } = req.body
        try {
            
            const usuario = await User.findById(userId);
            if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

            const producto = await Producto.findById(productoId);
            if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

            const itemExistente = usuario.carrito.find(item =>
                item.product.toString === productoId
            );

            if(!itemExistente){
              usuario.carrito.push({ product: productoId});
            }

            await usuario.save()
            res.status(201).json({ mensaje: 'Producto agregado al carrito', carrito: usuario.carrito })

        } catch (error) {
            console.error(error)
            res.status(500).json({mensaje: error.message})
            
        }

    }

    const getProducts = async (req, res) => {
        const { userId } = req.params;
      
        try {
          const usuario = await User.findById(userId).populate("carrito.product");
      
          if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
          }
      
          const productosEnCarrito = usuario.carrito.map(item => item.product);
      
          res.status(200).json(productosEnCarrito);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: error.message });
        }
      };

      const removeProduct = async (req, res) =>{
         const { userId } = req.params;
         const { productoId } = req.body;

        try {
          const usuario = await User.findById(userId);
          if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        // Eliminar el producto del carrito
        usuario.carrito = usuario.carrito.filter(item => 
            item.product.toString() !== productoId
        );

        await usuario.save();

        res.status(200).json({ mensaje: 'Producto eliminado del carrito', carrito: usuario.carrito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: error.message });
    }

    }

module.exports = {register, login, logout, getProfile, getUsers, verifyToken, addProduct, getProducts,removeProduct }