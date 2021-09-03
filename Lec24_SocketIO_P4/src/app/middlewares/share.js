/* Middleware này dùng để add cho toàn app */
const CategoryModel = require("../models/category");

module.exports = async (req, res, next) => {
  // Lưu menu vào biến toàn cục categories.
  /* 
    - lưu thuộc tính categories với giá trị là categories trong DB vào đối tượng res.locals
    Khi đó toàn bộ các view đều có thể sử dụng được biến này, mỗi khi chạy ứng dụng lên
    */
  res.locals.categories = await CategoryModel.find();

  /* reduce
  - nhận vào 2 tham số
    - 1 là callback function.
    - 2 là giá trị khởi tạo
  */
  res.locals.totalCartItems = req.session.cart.reduce(
    (total, product) => total + product.qty,
    0
  );
  res.locals.userID = req.session._id;
  next();
};
