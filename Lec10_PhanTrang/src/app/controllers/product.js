const ProductModel = require("../models/product");
const paginate = require("../../common/paginate");

const Index = async (req, res) => {
  // lấy trang hiện tại, nếu không có thì là 1
  const page = parseInt(req.query.page) || 1;

  // số document trên 1 trang
  const limit = 10;

  // tính số document sẽ bị bỏ qua
  const skip = page * limit - limit;

  // lay ra tong so document
  const total = await ProductModel.find().countDocuments();

  // tong so trang = tong so document/ so documen tren 1 trang
  /* 3029/10 = 302.9 -> lam tron la 303, tong so trang la 303  */
  const totalPage = Math.ceil(total / limit);

  // paginate(page, totalPage);

  // lay data tensp, gia, img
  // vi co ca danh muc ==> su dung populate de lay data
  const products = await ProductModel.find()
    .populate({ path: "cat_id" })
    .skip(skip)
    .limit(limit);
  // console.log(products[0].name);

  res.render("admin/product", {
    products: products,
    // la mang gia tri
    pages: paginate(page, totalPage),
    page: page,
    totalPage: totalPage,
  });
  // console.log(paginate(7, 12));
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
