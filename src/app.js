//Express

const express = require("express");

const app = express();

//productos
const ProductManager = require("./productManager");

const manager = new ProductManager("./productos.json");

const misProductos = manager.getProducts();

//creando ruta

app.get("/", (req, res) => {
  res.send("Bienvenido a la tienda");
});

const PUERTO = 8080;

app.listen(PUERTO, () => {
  console.log(`Escuchando con express en http://localhost:${PUERTO}`);
});

//rutas

//limite
app.get("/products", (req, res) => {
  let limit = parseInt(req.query.limit);

  if (limit) {
    const products = misProductos.slice(0, limit);
    res.send(products);
  } else {
    res.send(misProductos);
  }
});

//con id

app.get("/products/:id", (req, res) => {
  let id = req.params.id;
  const product = misProductos.find((item) => item.id == id);

  if (product) {
    res.send(product);
  } else {
    res.send("Producto no encontrado");
  }
});
