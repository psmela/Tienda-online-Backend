const express = require('express')
const router = express.Router()
const {register, login,logout, getProfile} = require('../controllers/authController')
const {Autorizacion} = require('../middlewares/validateToken')
const validateSchema = require('../middlewares/validator.middelware.js')
const {registerSchema, loginSchema} = require('../schemas/auth.schema.js')

router.post('/register',validateSchema(registerSchema), register)
router.post('/login',validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/perfil',Autorizacion, getProfile)

module.exports = router