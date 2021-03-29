const test = (req, res) => {
  // 3 tham số
  // tham số 1: views (bắt buộc), nếu không khai báo thì tự hiểu, views ở đây chính là đường dẫn đến folder views để lấy theme
  // tham số 2: là file ejs trong folder views test.ejs
  // tham số 3: truyền tham số sang bên view, PHẢI ĐẤY RA 1 ĐỐI TƯỢNG
  // key data, value: la 1 doi tuong co key la a, value 1000 ==> khi sang view data la bien luu tru gia tri la mot doi tuong. Để lấy được giá trị a, ta lấy đối tượng.thuoc_tinh

  res.render("test", { data: { a: 1000 } });

  //chuyển hướng sang router khác
  // res.redirect("/admin/logout");
};

module.exports = {
  testKey: test,
};
