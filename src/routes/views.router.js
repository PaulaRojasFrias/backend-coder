const express = require("express");
const router = express.Router();

//aca va la logica y las rutas por ej de real time products
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
