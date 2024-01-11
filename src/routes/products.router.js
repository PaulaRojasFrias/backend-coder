const express = require("express");
const router = express.Router();

//Productos
const ProductManager = require("../controllers/productManager.js");

const manager = new ProductManager("./src/models/productos.json");

//Rutas

//Limite
router.get("/", async (req, res) => {
  try {
    const misProductos = await manager.leerArchivo();
    let limit = parseInt(req.query.limit);
    if (limit) {
      const products = misProductos.slice(0, limit);
      return res.json(products);
    } else {
      return res.json(misProductos);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Se produjo un error al procesar la solicitud.");
  }
});

//Con id

router.get("/:id", async (req, res) => {
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

//post

router.post("/", (req, res) => {
  const nuevoProducto = req.body;
  manager.addProduct(nuevoProducto);
  res.send({ status: "success", message: "Producto agregado" });
});

module.exports = router;
