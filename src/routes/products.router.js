const express = require("express");
const router = express.Router();

const ProductModel = require("../dao/models/product.model.js");
const ProductManager = require("../dao/db/product-manager-db.js");

const manager = new ProductManager();

//Rutas

router.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page || 1;
  let sort = req.query.sort;
  const category = req.query.category;
  const stock = req.query.stock;
  let query = {};

  if (category) {
    query.category = category;
  }

  if (stock) {
    query.stock = stock;
  }

  if (sort) {
    if (sort === "asc") {
      sort = { price: 1 };
    } else if ((sort = "desc")) {
      sort = { price: -1 };
    }
  }
  try {
    const myProducts = await ProductModel.paginate(query, {
      limit,
      page,
      sort,
    });
    const myProductsResult = myProducts.docs.map((product) => {
      const { _id, ...rest } = product.toObject();
      return rest;
    });

    console.log(myProductsResult);
    res.render("products", {
      products: myProductsResult,
      hasPrevPage: myProducts.hasPrevPage,
      hasNextPage: myProducts.hasNextPage,
      prevPage: myProducts.prevPage,
      nextPage: myProducts.nextPage,
      currentPage: myProducts.page,
      totalPages: myProducts.totalPages,
    });
    //console.log(myProducts);
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
