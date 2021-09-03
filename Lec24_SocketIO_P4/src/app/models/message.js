const mongoose = require("../../common/database")();

const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      default: null,
    },
    room_id: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
    },
    author_id: {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    },
  },
  {
    timestamps: true,
  }
);

const RoomModel = mongoose.model("Message", messageSchema, "messages");
module.exports = RoomModel;
