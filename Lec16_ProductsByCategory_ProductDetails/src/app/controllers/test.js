const UserModel = require("../models/user");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const slug = require("slug");
const fs = require("fs"); // he thong quan ly file, file system
const path = require("path"); // module quan ly cac duong dan

// const test = async (req, res) => {
//   // 3 tham số
//   // tham số 1: views (bắt buộc), nếu không khai báo thì tự hiểu, views ở đây chính là key cấu hình ở file app.js đường dẫn đến folder views để lấy theme
//   // tham số 2: là file ejs trong folder views test.ejs
//   // tham số 3: truyền tham số sang bên view, PHẢI ĐẤY RA 1 ĐỐI TƯỢNG
//   // key data, value: la 1 doi tuong co key la a, value 1000 ==> khi sang view data la bien luu tru gia tri la mot doi tuong. Để lấy được giá trị a, ta lấy đối tượng.thuoc_tinh
//   // res.render("test", { data: { a: 1000 } });
//   // lọc data, tham số 1 là điều kiện lọc để tìm kiếm
//   // UserModel.find({}, (err, docs) => {
//   //   console.log(docs);
//   // });
//   // thêm data
//   // const UserInsert = new UserModel({
//   //   full_name: "Nguyễn Văn Test",
//   //   email: "nguyenvantest@gmail.com",
//   //   password: "123456",
//   //   role: "member",
//   // });
//   // UserInsert.save();
//   // sửa data
//   // UserModel.updateOne(
//   //   { _id: "606c5fc20c0e232858b5ed10" },
//   //   { password: "888666" }
//   // ).exec((err, docs) => {
//   //   console.log(`This is: ${err}`);
//   //   console.log(docs);
//   // });
//   // xóa data
//   // UserModel.deleteOne({ _id: "606c5fc20c0e232858b5ed10" }, (err, docs) => {
//   //   console.log(`This is: ${err}`);
//   //   console.log(docs);
//   // });
//   // exec la mot kieu bất đồng bộ
//   // const products = ProductModel.find()
//   //   .populate({ path: "cat_id" }) // truyền khóa ngoại vào populate
//   //   .exec((err, docs) => {
//   //     console.log(docs[0].cat_id.title); // result: nokia
//   //   });
//   //chuyển hướng sang router khác
//   // res.redirect("/admin/logout");
// };

// xử lý lấy data bằng đồng bộ
// const test = async (req, res) => {
//   // đồng bộ
//   const product = await UserModel.find().populate({ path: "cat_id" });
//   console.log(product);
// };

const test = (req, res) => {
  // tao 1 session
  // cu phap: req.session.session_name = value
  // req.session.data = "session defined";
  const title = "Xin chào Minh Thư";
  console.log(title);
  console.log(slug(title, { lower: true })); // bien title tu kys tu hoa ==> ky tu thuong, noi voi nhau la dau -

  res.send("test");
};

const test2 = (req, res) => {
  if (req.session.data) {
    res.send(req.session.data);
  } else {
    res.send("session not defined");
  }
  res.send("test2");
};

const test3 = (req, res) => {
  req.session.destroy(); // loai bo tat ca cac session
};

// upload
// bat buoc phai co enctype="multipart/form-data" thi moi upload file dc, vi file la dang binary
const frmUpload = (req, res) => {
  res.send(`
    <form method="post" enctype="multipart/form-data" >
      <input type="file" name="file_upload" />
      <button type="submit">Upload</button>
    </form>
  `);
};

const fileUpload = (req, res) => {
  // xu ly di chuyen file tu temp ve folder mình muốn
  const file = req.file;

  // renameSync nhận 2 tham số: 1 file nằm đâu(file nam o duong dan hien tai), 2 muốn đi tới đâu
  fs.renameSync(
    file.path,
    path.resolve("src/public/images/products", file.originalname)
  );

  console.log("uploaded");
};

module.exports = {
  testKey: test,
  testKey2: test2,
  testKey3: test3,
  frmUpload: frmUpload,
  fileUpload: fileUpload,
};
