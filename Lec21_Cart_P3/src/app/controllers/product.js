const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const fs = require("fs");
const path = require("path");
const slug = require("slug");
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
  // CÂU TRUY VẤN
  const products = await ProductModel.find()
    .populate({ path: "cat_id" })
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 }); // sap xep giam dan _id
  // console.log(products[0].name);

  res.render("admin/product", {
    products: products,
    // la mang gia tri
    pages: paginate(page, totalPage),
    page: page,
    totalPage: totalPage,
    skip: skip,
  });
  // console.log(paginate(7, 12));
};

const Create = async (req, res) => {
  const categories = await CategoryModel.find();
  // console.log(categories);

  res.render("admin/product/add_product", { categories: categories });
};

// controller cua method post voi URL /admin/products/store
const store = async (req, res) => {
  // cu phap cua multer chu kp cua bodyparser
  const body = req.body; // lay thong tin cua form
  const file = req.file; // lay thong tin file upload

  const product = {
    description: body.description,
    cat_id: body.cat_id,
    price: body.price,
    status: body.status,
    featured: body.featured === "on",
    promotion: body.promotion,
    warranty: body.warranty,
    accessories: body.accessories,
    is_stock: body.is_stock,
    name: body.name,
    slug: slug(body.name),
  };

  if (file) {
    const thumbnail = "products/" + file.originalname; // vao thu muc product/ + name_img

    product["thumbnail"] = thumbnail; // them 1 truong vao trong object product, name_Object["key"] = value. Theem truong thumnail voi gia tri la thumnail

    // chuyen file img nhan duoc vao thu muc mong muon
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));

    const data = new ProductModel(product);
    data.save();
    // console.log(product);
    // cách 2: new ProductModel(product).save();

    res.redirect("/admin/products");
  }
};

const EditProduct = async (req, res) => {
  const categories = await CategoryModel.find();

  // lay id tren url, va tim product voi id do
  const id = req.params.id;
  const product = await ProductModel.findById(id);

  console.log(product);

  res.render("admin/product/edit_product", {
    categories: categories,
    product: product,
  });
};

const update = async (req, res) => {
  // cu phap cua multer chu kp cua bodyparser
  const body = req.body; // lay thong tin cua form, làm việc với form trừ file
  const file = req.file; // lay thong tin file upload
  const id = req.params.id;

  const product = {
    description: body.description,
    cat_id: body.cat_id,
    price: body.price,
    status: body.status,
    featured: body.featured === "on",
    promotion: body.promotion,
    warranty: body.warranty,
    accessories: body.accessories,
    is_stock: body.is_stock,
    name: body.name,
    slug: slug(body.name),
  };

  // check update
  if (file) {
    const thumbnail = "products/" + file.originalname;

    product["thumbnail"] = thumbnail; // them 1 truong vao trong object product, cú pháp name_Object["key"] = value. Theem truong thumnail voi gia tri la thumnail

    // chuyen file img nhan duoc vao thu muc mong muon
    // renameSync: đổi tên từ đường dẫn tạm sang đường dẫn thực muốn lưu ảnh
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
  }

  await ProductModel.updateOne({ _id: id }, { $set: product });

  res.redirect("/admin/products");
};

const DeleteProduct = async (req, res) => {
  const id = req.params.id;

  await ProductModel.deleteOne({ _id: id });

  res.redirect("/admin/products");
};

module.exports = {
  index: Index,
  create: Create,
  edit: EditProduct,
  delete: DeleteProduct,
  store: store,
  update: update,
};
