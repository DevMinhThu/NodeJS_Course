const productModel = require("../models/product");

const Index = (req, res) => {
  res.send("Show product");
};

const Create = (req, res) => {
  res.send("add product");
};

const EditProduct = (req, res) => {
  res.send("edit product");
};

const DeleteProduct = (req, res) => {
  res.send("delete product");
};

module.exports = {
  index: Index,
  create: Create,
  edit: EditProduct,
  delete: DeleteProduct,
};
