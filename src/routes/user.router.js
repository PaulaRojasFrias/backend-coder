const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model");
const { createHash } = require("../utils/hashBcrypt");
const passport = require("passport");

// router.post("/", async (req, res) => {
//   const { first_name, last_name, email, password, age } = req.body;

//   try {
//     const existingUser = await UserModel.findOne({ email: email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .send({ error: "El correo electronico ya se encuentra registrado" });
//     }
//     if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//       role = "admin";
//     } else {
//       role = "usuario";
//     }

//     const newUser = await UserModel.create({
//       first_name,
//       last_name,
//       email,
//       password: createHash(password),
//       age,
//       role: role,
//     });

//     req.session.login = true;
//     req.session.user = { ...newUser._doc };
//     res.status(200).send({ message: "Usuario creado con exito" });
//   } catch (error) {
//     res.status(400).send({ error: "Error al crear el usuario" });
//   }
// });

//Registro con passport
router.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/failedregister",
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
    };

    req.session.login = true;

    res.redirect("/products");
  }
);

router.get("/failedregister", (req, res) => {
  res.send({ error: "Registro fallido" });
});

module.exports = router;
