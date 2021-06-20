/* file test code or test cac chuc nang truoc khi code vao thu muc/file chinh*/
const express = require("express");
const router = express.Router();

// khoi tao bien app
const app = express();

// lang nghe va tra data cho client
router.get("/search", (req, res) => {
  res.send(`
    <form method="post" action="/resultSearch">
        <input type="text" name="txt"/>
        <input type="submit" name="sbm" value="Search"/>
    </form>
  `);
});

// xu ly phuong thuc post khi submit trong <form></form>
router.post("/resultSearch", (req, res) => {
  res.send("When click Search ");
});

router.get("/users/:userId/products/:prdId", (req, res) => {
  console.log(req.params);
  res.send("This is page Home");
});

// tao duong dan tuyet doi
// nhan vao 2 tham so
// Khi search URL la: /staticURL se cho ta lay duoc cac item trong folder public
// __dirname: cho phép lấy ra đường dẫn tới thư mục hiện tại của file, ở đây thì __dirname là đường dẫn ở file test.js
app.use("/staticURL", express.static(__dirname + "/src/public"));

// gan router vao app thong qua method use
app.use(router);

// server
app.listen((port = 3000), () => {
  console.log("Server running on port " + port);
});

/**
 * get: có 2 tham số, 1 là router, 2 là xử lý chức năng ở router đó (là một function)
 * listen: có 2 tham số, 1 là cổng truy cập, 2 là function
 * router thay app xử lý các chức năng.
 * GET: phương thức truyền data theo kiểu click vào 1 liên kết
 * POST: truyền data theo kiểu điền vào 1 form
 * Không khai báo method là POST thì là GET
 */
