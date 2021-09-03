const mongoose = require("../../common/database")();
const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      // enum: bắt buộc phải chọn giá trị trong enum để hiẻn thị
      enum: ["private", "group"],
      default: "private",
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const RoomModel = mongoose.model("Room", roomSchema, "rooms");
module.exports = RoomModel;
