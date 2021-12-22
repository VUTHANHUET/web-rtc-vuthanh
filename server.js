const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    // origin: "https://web-rtc-vuthanh.surge.sh/" || "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
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
  socket.on("Client-send", (data) => {
    console.log(data); //data= U,D,L,R,S
    var packet = new Uint8Array(1);
    switch (data) {
      case "U":
        packet[0] = 102; //chu f trong ASCII
        break;
      case "L":
        packet[0] = 108; //chu l trong ASCII
        break;
      case "R":
        packet[0] = 114; //chu r trong ASCII
        break;
      case "D":
        packet[0] = 98; //chu b trong ASCII
        break;
      case "S":
        packet[0] = 115; //chu s trong ASCII
        break;
      default:
        packet[0] = 0;
        break;
    }
    sp.write(packet);
    for (i = 0; i < 1; i++) {
      console.log(packet[i]);
    }
    console.log("Packet Sent");
    //server phat tin hieu cho tat ca cac client
    io.sockets.emit("Server-send", data);
  });
});

server.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));
