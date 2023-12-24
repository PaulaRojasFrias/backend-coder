//Express

const express = require("express");

const app = express();

//Productos
const ProductManager = require("./productManager");

const manager = new ProductManager("./src/productos.json");

//Puerto

const PUERTO = 8080;

app.listen(PUERTO, () => {
  console.log(`Escuchando con express en http://localhost:${PUERTO}`);
});

//Rutas

app.get("/", (req, res) => {
  res.send("Bienvenido a la tienda!!");
});

//Limite
app.get("/products", async (req, res) => {
  try {
    const misProductos = await manager.leerArchivo();
    let limit = parseInt(req.query.limit);
    if (limit) {
      const products = misProductos.slice(0, limit);
      return res.send(products);
    } else {
      return res.send(misProductos);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Se produjo un error al procesar la solicitud.");
  }
});

//Con id

app.get("/products/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const product = await manager.getProductsById(id);

    if (product) {
      return res.send(product);
    } else {
      return res.send("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Se produjo un error al procesar la solicitud.");
  }
});
