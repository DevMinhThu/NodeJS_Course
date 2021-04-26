const UserModel = require("../models/user");

const Login = (req, res) => {
  res.render("admin/login", { data: {} });
};

const postLogin = async (req, res) => {
  const email = req.body.mail;
  const pass = req.body.pass;
  let error;

  /**
   * email,password: là tên 2 trường trong collection user
   * lấy ra data và lưu vào user
   */
  const user = await UserModel.find({ email: email, password: pass });
  // console.log(user);

  if (email === "" || pass === "") {
    error = "Thông tin không được để trống!";
  } else if (user.length > 0) {
    req.session.mail = email;
    req.session.pass = pass;
    res.redirect("/admin");
  } else {
    error = "Tài khoản không hợp lệ!";
  }
  res.render("admin/login", { data: { error: error } });
};

module.exports = {
  login: Login,
  postLogin: postLogin,
};
