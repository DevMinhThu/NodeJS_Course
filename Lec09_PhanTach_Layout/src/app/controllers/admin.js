const UserModel = require("../models/user");
const ProductModel = require("../models/product");

const Dashboard = async (req, res) => {
  // lay data cua user va product tu database
  const users = await UserModel.find();
  const totalUsers = users.length;

  const products = await ProductModel.find();
  const totalProducts = products.length;

  // đường dẫn tới views index
  // truyen data sang ben views
  res.render("admin/index", { totalUsers, totalProducts });
};

module.exports = {
  dashboard: Dashboard,
};
