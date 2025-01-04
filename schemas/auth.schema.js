const z = require('zod')

const registerSchema = z.object({
    userName: z.string({
        required_error: "el usuario es requerido"
    }),
    email: z.string({
        required_error: "el email es requerido"
    }).email({message: "email invalido"}) ,
    password: z.string({
        required_error: "la contraseña es requerida"
    }).min(6, {message: "la contraseña debe tener almenos 6 caracteres"})
})

const loginSchema = z.object({
    email: z.string({
        required_error: "el email es requerido"
    }).email({message: "email invalido"}) ,
    password: z.string({
        required_error: "la contraseña es requerida"
    }).min(6, {message: "la contraseña debe tener almenos 6 caracteres"})
})

module.exports = {registerSchema, loginSchema}