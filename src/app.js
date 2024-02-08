const express = require("express");
const app = express();
const PUERTO = 8080;
const socket = require("socket.io");
const viewsRouter = require("./routes/views.router.js");
const exphbs = require("express-handlebars"); //Handlebars
require("./database.js"); //mongoose

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rutas
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(express.static("./src/public"));
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando con express en http://localhost:${PUERTO}`);
});

//chat
const io = new socket.Server(httpServer);
const MessageModel = require("./dao/models/message.model.js");

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", async (data) => {
    await MessageModel.create(data);
    const messages = await MessageModel.find();
    console.log(messages);
    io.sockets.emit("message", messages);
  });
});
