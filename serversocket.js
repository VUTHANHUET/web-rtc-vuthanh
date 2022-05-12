var app = require("express")();
//var http = require('http').Server(app);
var http = require("http").createServer(app);
//var io = require('socket.io')(http);
var io = require("socket.io")(3000);

io.attach(http, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
  socket.on("message", function (msg) {
    console.log("message: " + msg);
  });
  timeout();
});
function timeout() {
  setTimeout(function () {
    io.emit("reply", "A message from server");
    timeout();
  }, 5000);
}
http.listen();
