const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cartManager.js");
const manager = new CartManager("./src/models/carts.json");

router.post("/", (req, res) => {
  const cid = manager.createCart();
  res.json({ status: "success", message: "Nuevo carrito creado", cid });
});

router.get("/:cid", async (req, res) => {
  try {
    let cid = parseInt(req.params.cid);
    const cart = await manager.getCartById(cid);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).send("Carrito no encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);

    await manager.addProduct(cid, pid);

    res
      .status(201)
      .json({ status: "success", message: "Producto agregado al carrito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
