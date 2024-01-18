//Express
const express = require("express");

const app = express();

const PUERTO = 8080;

const viewsRouter = require("./routes/views.router.js");

//Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter);

app.listen(PUERTO, () => {
  console.log(`Escuchando con express en http://localhost:${PUERTO}`);
});
