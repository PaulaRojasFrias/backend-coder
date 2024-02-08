const express = require("express");
const router = express.Router();

//Productos
const ProductManager = require("../dao/db/product-manager-db.js");

const manager = new ProductManager();

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
  const newProduct = req.body;
  manager.addProduct(newProduct);
  res.send({ status: "success", message: "Producto agregado" });
});

//update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  manager.updateProduct(id, updatedProduct);
  res.send({ status: "success", message: "Producto actualizado" });
});

//delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const myProducts = manager.leerArchivo();
  const indexToDelete = myProducts.findIndex((product) => product.id === id);

  if (indexToDelete !== -1) {
    myProducts.splice(indexToDelete, 1);

    manager.guardarArchivo(myProducts);

    res.json({ status: "success", message: "Producto eliminado" });
  } else {
    res
      .status(404)
      .json({ status: "error", message: "Producto no encontrado" });
  }
});

module.exports = router;
