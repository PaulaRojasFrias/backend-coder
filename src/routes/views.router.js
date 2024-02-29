const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager();
const ProductModel = require("../dao/models/product.model.js");
const ProductManager = require("../dao/db/product-manager-db.js");
const productmanager = new ProductManager();

router.get("/", async (req, res) => {
  res.send("Bienvendido a la tienda!");
});

router.get("/products", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const page = req.query.page || 1;
  let sort = req.query.sort;
  const category = req.query.category;
  const stock = req.query.stock;
  let query = {};
  const userRole = req.session.role;
  const isAdmin = userRole === "admin" ? true : false;

  if (category) {
    query.category = category;
  }

  if (stock) {
    query.stock = stock;
  }

  if (sort) {
    if (sort === "asc") {
      sort = { price: 1 };
    } else if (sort === "desc") {
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

    res.render("products", {
      status: "success",
      products: myProductsResult,
      totalPages: myProducts.totalPages,
      prevPage: myProducts.prevPage,
      nextPage: myProducts.nextPage,
      currentPage: myProducts.page,
      hasPrevPage: myProducts.hasPrevPage,
      hasNextPage: myProducts.hasNextPage,
      prevLink: myProducts.hasPrevPage
        ? `/products?page=${myProducts.prevPage}&sort=${sort}&category=${category}&stock=${stock}`
        : null,
      nextLink: myProducts.hasNextPage
        ? `/products?page=${myProducts.nextPage}&sort=${sort}&category=${category}&stock=${stock}`
        : null,
      limit: limit,
      user: req.session.user,
      isAdmin: isAdmin,
    });
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartManager.getCartByid(cartId);

    if (!cart) {
      console.log("No existe carrito con ese id");
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const cartProducts = cart.products.map((item) => ({
      product: item.product.toObject(),
      quantity: item.quantity,
    }));

    res.render("carts", { products: cartProducts });
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
