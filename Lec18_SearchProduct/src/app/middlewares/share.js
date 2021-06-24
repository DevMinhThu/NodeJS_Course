/* Middleware này dùng để add cho toàn app 
1. Khi chạy ứng dụng lên, middleware sẽ được chạy và tạo ra 1 biến toàn cục.
    - biến này có thể được sử dụng ở mọi nơi trong app
2. Sau đó router sẽ được chạy, khi đó tất cả các router đều có thể sử dụng biến này.
*/
const CategoryModel = require("../models/category");

module.exports = async (req, res, next) => {
  // Lưu menu vào biến toàn cục categories.
  /* 
    - lưu thuộc tính categories với giá trị là categories được lấy trong DB vào đối tượng res.locals
    Khi đó toàn bộ các view đều có thể sử dụng được biến này, mỗi khi chạy ứng dụng lên
    */
  res.locals.categories = await CategoryModel.find();
  next();
};
