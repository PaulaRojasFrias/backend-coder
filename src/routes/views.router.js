const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Bienvendido a la tienda!");
});

module.exports = router;
