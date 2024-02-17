const express = require("express");
const router = express.Router();
const CartModel = require("../dao/models/cart.model.js");
const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error al crear un nuevo carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await CartModel.findById(cid);

    if (!cart) {
      console.log("No existe un carrito con ese id");
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    return res.json(carts.products);
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updateCart = await cartManager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updateCart.products);
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const updatedCart = await cartManager.deleteProductFromCart(
      cartId,
      productId
    );

    res.json({
      status: "succes",
      message: "Producto eliminado del carrito correctamente",
      updatedCart,
    });
  } catch (error) {
    onsole.error("Error al eliminar el producto del carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body;
  try {
    const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
    res.json(updatedCart);
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;

    const updatedCart = await cartManager.updateProductQuantity(
      cartId,
      productId,
      newQuantity
    );

    res.json({
      status: "success",
      message: "Cantidad del producto actualizada correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito",
      error
    );
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedCart = await cartManager.deleteCartContent(cartId);

    res.json({
      status: "succes",
      message:
        "Todos los productos del carrito fueron eliminados correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error("Error al vaciar el carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});
module.exports = router;
