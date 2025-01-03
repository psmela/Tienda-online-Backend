const jwt = require('jsonwebtoken')
require('dotenv').config()

const Autorizacion = (req, res, next) =>{
 const {token} = req.cookies
 if(!token) return res.status(401).json({message: "No token"})
 jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
if (err) return res.status(403).json({message: "token invalido"})
req.user = user
next()
})
}

module.exports = {Autorizacion}