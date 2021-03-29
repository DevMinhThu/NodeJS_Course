const Login = (req, res) => {
  res.send("Login");
};

const Logout = (req, res) => {
  res.send("Logout");
};

module.exports = {
  login: Login,
  logout: Logout,
};
