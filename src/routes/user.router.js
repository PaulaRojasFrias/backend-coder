const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model");

router.post("/", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .send({ error: "El correo electronico ya se encuentra registrado" });
    }
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      role = "admin";
    } else {
      role = "usuario";
    }

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password,
      age,
      role: role,
    });

    req.session.login = true;
    req.session.user = { ...newUser._doc };
    res.status(200).send({ message: "Usuario creado con exito" });
  } catch (error) {
    res.status(400).send({ error: "Error al crear el usuario" });
  }
});

module.exports = router;
