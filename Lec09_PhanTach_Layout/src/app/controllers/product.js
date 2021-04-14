const ProductModel = require("../models/product");

const Index = async (req, res) => {
  // lay data tensp, gia, img
  // vi co ca danh muc ==> su dung populate de lay data
  const products = await ProductModel.find().populate({ path: "cat_id" });
  // console.log(products[0].name);

  res.render("admin/product", { products: products });
};

const Create = (req, res) => {
  res.render("admin/product/add_product");
};

const EditProduct = (req, res) => {
  res.render("admin/product/edit_product");
  console.log(req.params);
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
