const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://paularojasfrias5:JDDAXiu1gqZGhQEE@cluster0.rc2dfjg.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conexión exitosa"))
  .catch(() => console.log("Error en la conexión"));
