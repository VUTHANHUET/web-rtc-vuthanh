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
// client.on("connect", () => {
//   setInterval(() => {
//     var random = Math.random() * 50;
//     console.log(random);
//     if (random < 30) {
//       client.publish("room/lamp", "on" + random.toString()) + '.';
//     }
//   }),30000;
// });

client.on("connect", function () {
  client.subscribe("room/lamp");
  console.log("Client has subscribed successfully");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  client.on("message", function (topic, message) {
    console.log(message.toString());
    socket.emit("temp".message.toString());
  });

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
  socket.on("Client-send", (data) => {
    console.log("Server vưa nhan duoc " + data); //data= U,D,L,R,S
    io.sockets.emit("Server-send", data);
    console.log("Server vừa gửi" + data);
  });
  socket.emit("Client-send", socket.id);
});

server.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));
