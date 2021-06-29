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

  /* reduce
  - nhận vào 2 tham số
    - 1 là callback function.
      + tham số đầu tiên trong callback, nếu không khởi tạo giá trị ban đầu
      => giá trị ban đầu sẽ là giá trị phần tử đầu tiên của mảng nó duyệt.
      - trong ví dụ dưới: tham số đầu tiên trong callback là total = 0, vì mình khởi tạo giá trị ban đâuf bằng 0
      + tham số thứ 2 trong callback là các giá trị trong mảng, nếu đã có giá trị khởi tạo
      nếu giá trị khởi tạo là phần tử đầu tiên trong mảng => tham số thứ 2 sẽ là các giá trị của mảng trừ giá trị đầu    
      - 2 là giá trị khởi tạo
  */
  res.locals.totalCartItems = req.session.cart.reduce(
    (total, product) => total + product.qty,
    0
  );
  next();
};
