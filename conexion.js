const mongoose = require("mongoose");
require("dotenv").config();

const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.6ztjp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(url)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch(err => {
    console.error("Error de conexión a MongoDB:", err);
  });
