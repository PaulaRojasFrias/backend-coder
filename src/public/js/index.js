const socket = io();
socket.emit("message", "Hola mundo");
socket.on("saludito", (data) => {
  console.log(data);
});
