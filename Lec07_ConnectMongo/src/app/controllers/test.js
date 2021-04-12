const UserModel = require("../models/user");

const test = (req, res) => {
  // 3 tham số
  // tham số 1: views (bắt buộc), nếu không khai báo thì tự hiểu, views ở đây chính là đường dẫn đến folder views để lấy theme
  // tham số 2: là file ejs trong folder views test.ejs
  // tham số 3: truyền tham số sang bên view, PHẢI ĐẤY RA 1 ĐỐI TƯỢNG
  // key data, value: la 1 doi tuong co key la a, value 1000 ==> khi sang view data la bien luu tru gia tri la mot doi tuong. Để lấy được giá trị a, ta lấy đối tượng.thuoc_tinh
  res.render("test", { data: { a: 1000 } });

  // lọc data
  // UserModel.find({}, (err, docs) => {
  //   console.log(docs);
  // });

  // thêm data
  // const UserInsert = new UserModel({
  //   full_name: "Nguyễn Văn Test",
  //   email: "nguyenvantest@gmail.com",
  //   password: "123456",
  //   role: "member",
  // });
  // UserInsert.save();

  // sửa data
  // UserModel.updateOne(
  //   { _id: "606c5fc20c0e232858b5ed10" },
  //   { password: "888666" }
  // ).exec((err, docs) => {
  //   console.log(`This is: ${err}`);
  //   console.log(docs);
  // });

  // xóa data
  UserModel.deleteOne({ _id: "606c5fc20c0e232858b5ed10" }, (err, docs) => {
    console.log(`This is: ${err}`);
    console.log(docs);
  });

  //chuyển hướng sang router khác
  // res.redirect("/admin/logout");
};

module.exports = {
  testKey: test,
};
