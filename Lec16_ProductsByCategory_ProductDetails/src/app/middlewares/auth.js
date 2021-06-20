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

module.exports = {
  checkLogin: checkLogin,
  checkAdmin: checkAdmin,
};
