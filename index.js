const express = require ("express")
const app = express()
const port =3000
const conexion= require("./conexion.js")
const productoRoutes = require('./routes/productoRoutes');


async function main() {
try {
    await conexion
    console.log ("Conexion exitosa")
    app.listen(port, ()=>{
        console.log ("Escuchando en el puerto:",port)
    })
} catch (error) {
    console.log(error.message)
    
}
}



