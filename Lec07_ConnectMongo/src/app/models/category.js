// Bước 1: gọi file kết nối tới mongodb, phải có () để thực thi hàm và  lấy được giá trị của return là đối tượng mongoose
const mongoose = require("../../common/database")();

// Bước 2: sử dụng schema để mô tả collection
const categorySchema = mongoose.Schema({
  description: {
    type: String,
    // không được để trống
    default: null,
  },

  title: {
    type: String,
    // không được trùng
    unique: true,
    default: null,
  },

  slug: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: null,
  },

  updatedAt: {
    type: Date,
    default: null,
  },
});

// Bước 3: Biến lớp user schema thành Model
// có 3 tham số:
// tham số thứ 1: là bí danh của user khi được mô tả sang dạng model (đặt tên gì cũng được)
// tham số thứ 2: là đối tượng schema mới được khởi tạo
// tham số thứ 3: là tến collection mà schema quản lý
const CategoryModel = mongoose.model(
  "categoryModel",
  categorySchema,
  "categories"
);

module.exports = CategoryModel;
