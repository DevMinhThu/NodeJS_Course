const UserModel = require("../models/user");

const Login = (req, res) => {
  res.render("admin/login", { data: {} });
};

const postLogin = async (req, res) => {
  const email = req.body.mail;
  const pass = req.body.pass;
  const { redirect } = req.query;
  let error;

  /**
   * email,password: là tên 2 trường trong collection user
   * lấy ra data và lưu vào user
   */
  const user = await UserModel.find({ email: email, password: pass });

  if (email === "" || pass === "") {
    error = "Thông tin không được để trống!";
  } else if (user.length > 0) {
    // khoi tao session mail, pass
    req.session.mail = email;
    req.session.pass = pass;

    // lấy id của tk đăng nhập
    req.session._id = user[0]._id;
    // nếu tồn tại redirect thì trả về redirect (là /chat), không thì trả về /admin
    res.redirect(redirect ? redirect : "/admin");
  } else {
    error = "Tài khoản không hợp lệ!";
  }
  res.render("admin/login", { data: { error: error } });
};

module.exports = {
  login: Login,
  postLogin: postLogin,
};
