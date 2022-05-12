const express = require("express");
const http = require("http");
const app = express();
const mqtt = require("mqtt");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    // origin: "https://web-rtc-vuthanh.surge.sh/" || "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;
var client = mqtt.connect("mqtt://broker.mqttdashboard.com");
var client2 = mqtt.connect("mqtt://broker.mqttdashboard.com");

var heartrate = 0;
var sp = 0;
client.on("connect", function () {
  client.subscribe("room/heartrate");
  console.log("Client1 has subscribed successfully");
});
client.on("message", function (topic, message) {
  // console.log(message.toString());
  he = message.toString();
  console.log(topic, message.toString());
  io.sockets.emit("Server-send-he", he);
});
client2.on("connect", function () {
  client.subscribe("room/sp");
  console.log("Client2 has subscribed successfully");
});
client2.on("message", function (topic2, message2) {
  // console.log(message.toString());
  sp = message2.toString();
  console.log(topic2, message2.toString());
  io.sockets.emit("Server-send-sp", sp);
});

io.on("connection", (socket) => {
  console.log;
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("Client-send-control", (data) => {
    console.log("server has received message: " + data); //data= U,D,L,R,S
    io.sockets.emit("Server-send-control", data);
    console.log("server sent message: " + data); //data= U,D,L,R,S
  });
  // socket.on("Client-send-he", (data) => {
  //   console.log("Server vưa nhan duoc he: " + data);
  //   io.sockets.emit("Server-send-he", data);
  //   console.log("Server vừa gửi đi he: " + data);
  // });
  // socket.on("Client-send-sp", (data) => {
  //   console.log("Server vưa nhan duoc sp: " + data);
  //   io.sockets.emit("Server-send-sp", data);
  //   console.log("Server vừa gửi đi sp:" + data);
  // });
});

server.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));
