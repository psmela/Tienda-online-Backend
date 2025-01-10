const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const CreateAccesToken = require('../libs/jwt.js')

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
    const {email, password} = req.body
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
  email: FoundUser.email

})

}

module.exports = {register, login, logout, getProfile}