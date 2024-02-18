const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  res.send("Bienvendido a la tienda!");
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

module.exports = router;
