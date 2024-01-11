//Express

const express = require("express");

const app = express();

//Puerto

const PUERTO = 8080;

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
  res.send("Bienvenido a la tienda!!");
});

app.listen(PUERTO, () => {
  console.log(`Escuchando con express en http://localhost:${PUERTO}`);
});
