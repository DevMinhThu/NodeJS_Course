const checkLogin = (req, res, next) => {
  if (req.session.mail && req.session.pass) {
    return res.redirect("/admin");
  }
  next(); // sau khi xu ly xong ben tren se next chuyen den controller
};

const checkAdmin = (req, res, next) => {
  if (!req.session.mail || !req.session.pass) {
    return res.redirect("/admin/login");
  }
  next();
};

const checkUser = (req, res, next) => {
  if (!req.session.mail || !req.session.pass) {
    // redirect nhan vao string nao cx dc
    // tối ưu nhất là truyền lại url đó vào
    return res.redirect(`/admin/login?redirect=${req.originalUrl}`);
  }
  next();
};

module.exports = {
  checkLogin: checkLogin,
  checkAdmin: checkAdmin,
  checkUser,
};
