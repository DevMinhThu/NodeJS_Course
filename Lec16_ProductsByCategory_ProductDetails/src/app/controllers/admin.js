const UserModel = require("../models/user");
const ProductModel = require("../models/product");

const Dashboard = async (req, res) => {
  // neu khon ton tai mail va pass thi chuyen ve login
  if (!req.session.mail || !req.session.pass) {
    return res.redirect("/admin/login");
  }

  // lay data cua user va product tu database
  const users = await UserModel.find();
  const totalUsers = users.length;

  const products = await ProductModel.find();
  const totalProducts = products.length;

  // đường dẫn tới views index
  // truyen data sang ben views
  res.render("admin/index", { totalUsers, totalProducts });
};

const Logout = (req, res) => {
  req.session.destroy();

  return res.redirect("/admin/login");
};

module.exports = {
  dashboard: Dashboard,
  logout: Logout,
};
