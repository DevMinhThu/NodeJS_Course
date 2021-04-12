const Index = (req, res) => {
  res.render("admin/product");
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
