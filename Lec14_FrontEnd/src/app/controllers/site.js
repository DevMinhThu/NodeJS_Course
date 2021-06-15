const home = (req, res) => {
  res.render("site/index");
};

const category = (req, res) => {
  res.render("site/category");
};

const product = (req, res) => {
  res.render("site/product");
};

const search = (req, res) => {
  res.render("site/search");
};

const cart = (req, res) => {
  res.render("site/cart");
};

const success = (req, res) => {
  res.render("site/success");
};

module.exports = {
  home: home,
  category: category,
  product: product,
  search: search,
  cart: cart,
  success: success,
};
