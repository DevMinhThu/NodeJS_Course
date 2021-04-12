const Dashboard = (req, res) => {
  // đường dẫn tới views index
  res.render("admin/index");
};

module.exports = {
  dashboard: Dashboard,
};
