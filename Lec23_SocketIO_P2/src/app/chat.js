const socket = require("socket.io");

module.exports = (server) => {
    // tạo ra đối tượng io
  const io = socket(server);
  io.on("connection", (socket) => {
    console.log("client connection");
  });
};
