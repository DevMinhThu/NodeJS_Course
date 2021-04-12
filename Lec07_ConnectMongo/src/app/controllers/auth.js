const Login = (req, res) => {
  res.render("admin/login", { data: {} });
};

const postLogin = (req, res) => {
  const email = req.body.mail;
  const pass = req.body.pass;
  let error;

  if (email === "" || pass === "") {
    error = "Thông tin không được để trống!";
  } else if (email === "vietpro.edu.vn@gmail.com" && pass === "123456") {
    res.redirect("/admin/dashboard");
  } else {
    error = "Tài khoản không hợp lệ!";
  }
  res.render("admin/login", { data: { error: error } });
};

const Logout = (req, res) => {
  res.send("Logout");
};

module.exports = {
  login: Login,
  logout: Logout,
  postLogin: postLogin,
};
