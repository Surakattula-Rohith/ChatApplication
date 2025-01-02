const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static("public"));

let chatRooms = {};

io.on("connection", (socket) => {
  console.log("new user connected : ", socket.id);
  socket.emit("message", "Welcome to the Chat Server");

  socket.on("send_message", (data) => {
    console.log("Message received : ", data);
    socket.broadcast.emit("broadcast", {
      username: data.username,
      messageText: data.messageText,
    });
  });


});

app.get("/", (req, res) => {
  res.send("hello world!");
});

server.listen(4000, () => {
  console.log("listening at 4000");
});
