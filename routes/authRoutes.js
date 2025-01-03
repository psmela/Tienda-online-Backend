const express = require('express')
const router = express.Router()
const {register, login,logout, getProfile} = require('../controllers/authController')
const {Autorizacion} = require('../middlewares/validateToken')
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/perfil',Autorizacion, getProfile)

module.exports = router