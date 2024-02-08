//Express
const express = require("express");

const app = express();

const PUERTO = 8080;

//mongoose
require("./database.js");

const viewsRouter = require("./routes/views.router.js");

const ProductManager = require("./controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

//Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Socket.io
// const socket = require("socket.io");

//Rutas
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(express.static("./src/public"));
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando con express en http://localhost:${PUERTO}`);
});

// const io = socket(httpServer);

// //evento connection
// io.on("connection", async (socket) => {
//   console.log("Un cliente se conecto");
//   socket.on("message", (data) => {
//     console.log(data);
//     io.sockets.emit("message", data);
//   });
//   socket.emit("saludito", "Hola cliente, ¿cómo estas?");
//   socket.emit("productos", await productManager.getProducts());

//   socket.on("eliminarProducto", async (id) => {
//     await productManager.deleteProduct(id);

//     io.sockets.emit("productos", await productManager.getProducts());
//   });

//   socket.on("agregarProducto", async (producto) => {
//     await productManager.addProduct(producto);

//     io.sockets.emit("productos", await productManager.getProducts());
//   });
// });
