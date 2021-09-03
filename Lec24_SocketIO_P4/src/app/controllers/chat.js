const UserModel = require("../models/user");
const RoomModel = require("../models/room");

module.exports.chat = async (req, res) => {
  const userID = req.session._id;

  // lọc ra tất cả user trừ tk user đang đăng nhập bằng cú pháp $nin
  // lọc tất cả user trừ user có id trong mảng nin
  const users = await UserModel.find({
    _id: { $nin: [userID] },
  });

  // lấy ra tất cả room của tk đang đăng nhập
  // populate: path nhận vào key của roomSchema
  // với key users này, nó ref với bảng User => ta có thể lấy được cả thông tin của user đó
  const rooms = await RoomModel.find({
    users: { $all: [userID] },
  }).populate({ path: "users" });

  res.render("chat", { users, rooms });
};
