const socketIO = require("socket.io");
const app = require("./app");
const shareSession = require("express-socket.io-session");
const roomModel = require("./models/room");

module.exports = (server) => {
  const io = socketIO(server);
  /* 
    - shareSession nhận vào cấu hình session của tk app để có thể lấy được session
    => app.session bên app.js đang lưu cấu hình session
  */
  io.use(shareSession(app.session));
  io.on("connection", (socket) => {
    socket.on("START_CONVERSATION", async ({ type, id }) => {
      // Lấy ra ID của bản thân mình từ thông tin đăng nhập lưu trong Session
      const currentUserId = socket.handshake.session._id;

      // Tạo một mảng UserID với ID đầu tiên chính là của chủ Room
      const users = [currentUserId];

      // Khai báo biến room để lưu lại thông tin Room cuối cùng sẽ trả về cho Client
      let room;

      // === Nếu type là User thì tìm Room giữa 2 User ===
      // TH1: khi click vao user trong list user, hoac click vao user da co room roi
      if (type === "user") {
        // push id cua user do vao mang users
        users.push(id);
        room = await roomModel
          .findOne({
            users: { $all: users },
            type: "private",
          })
          .populate("users");
      }

      // Nếu type là Room thì tìm Room với ID
      // kèm theo điều kiện phải có User hiện tại trong đó
      if (type === "room") {
        room = await roomModel
          .findOne({
            users: { $all: users },
            _id: id,
          })
          .populate("users");
      }

      // Nếu Room không tồn tại và type là User
      // thì sẽ tạo ra Room mới
      if (!room && type === "user") {
        room = await new roomModel({
          users: users,
        }).save();

        // lấy ra 1 room vừa tạo và lấy ra được user của room đó
        room = await roomModel.findById(room._id).populate("users");
      }

      // Đến đây, nếu như đã có Room thì trả Room về cho Client
      if (room) {
        socket.emit("START_CONVERSATION_SUCCESS", { room });
      }
    });

    console.log("Client Connect");
  });
};
