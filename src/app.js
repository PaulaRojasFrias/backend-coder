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

//Socket.io
const socket = require("socket.io");

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

const io = socket(httpServer);

//evento connection
io.on("connection", (socket) => {
  console.log("Un cliente se conecto");
  socket.on("message", (data) => {
    console.log(data);
    io.sockets.emit("message", data);
  });
  socket.emit("saludito", "Hola cliente, ¿cómo estas?");
});
