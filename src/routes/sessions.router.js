const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model");
const { isValidPassword } = require("../utils/hashBcrypt.js");
const passport = require("passport");

//login con passport
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", message: "Credenciales invalidas" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      cart: req.user.cartId,
    };

    req.session.login = true;

    res.redirect("/products");
  }
);

router.get("/faillogin", async (req, res) => {
  console.log("Fallo la estrategia");
  res.send({ error: "error en la estrategia" });
});

router.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
    res.redirect("/login");
  }
  res.status(200).send({ message: "Login eliminado" });
});

//github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/products");
  }
);

router.get("/current", (req, res) => {
  if (req.session.login && req.session.user) {
    res.status(200).send({ user: req.session.user });
  } else {
    res.status(401).send({ error: "No hay sesión de usuario activa" });
  }
});

module.exports = router;
