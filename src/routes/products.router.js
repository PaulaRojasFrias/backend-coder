const express = require("express");
const router = express.Router();

//Productos
const ProductManager = require("../dao/db/product-manager-db.js");

const manager = new ProductManager();

//Rutas

//Limite
router.get("/", async (req, res) => {
  try {
    const myProducts = await manager.getProducts();
    const limit = req.query.limit;
    if (limit) {
      const products = misProductos.slice(0, limit);
      return res.json(products);
    } else {
      return res.json(myProducts);
    }
  } catch (error) {
    console.log("Error al obtener los productos", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

//Con id

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await manager.getProductById(id);

    if (product) {
      return res.json(product);
    } else {
      return res.json({
        error: "Producto no encontrado",
      });
    }
  } catch (error) {
    console.log("Error al obtener el producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

//post

router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    await manager.addProduct(newProduct);
    res.status(201).json({
      message: "Producto agregado exitosamente",
    });
  } catch (error) {
    console.error("Error al agregar producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

//update
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  try {
    await manager.updateProduct(id, updatedProduct);
    res.json({
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await manager.deleteProduct(id);
    res.json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
