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

    /* 
      - chuyen file img nhan duoc vao thu muc mong muon
      - renameSync: nhận vào 2 tham số 
        - 1. đường dẫn của file hiện tại
        - 2. đường dẫn mình muốn di chuyển tới
      - resolve: giải quyết vấn đề tìm kiếm đến đường dẫn lưu trữ file dễ hơn (giống cơ chế của terminal, đi vào từng cấp thư mục)
    */
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
  }

  const data = new ProductModel(product);
  data.save();
  // console.log(product);

  res.redirect("/admin/products");
};

const EditProduct = async (req, res) => {
  const categories = await CategoryModel.find();

  const id = req.params.id;
  const product = await ProductModel.findById(id);

  console.log(product);

  res.render("admin/product/edit_product", {
    categories: categories,
    product: product,
  });
};

const update = async (req, res) => {
  const id = req.params.id;

  // req.body: la cu phap cua multer, kp cua bodyparser
  const body = req.body; // lay thong tin form, lam viec voi form. Khong lam viec voi file
  const file = req.file; // lay thong tin file upload

  // tao new product object luu lai cac gia tri thay doi tai form
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

  /* 
  - Check upload file
  - Neu ton tai file upload thi thuc thi.
  */
  if (file) {
    /* Step 1:
    - tao variable thumbnail: luu lai img upload
    - img luu tru trong public/images/product ==> can luu anh upload tai "product/" + file.originalname
    - file.originalname: chinh la lay ten img ma minh upload
    */
    const thumbnail = "products/" + file.originalname;

    /* Step 2:
    - Them thuoc tinh thumbnail vao product object
    - Cu phap: name_Object["key"] = value.
    */
    product["thumbnail"] = thumbnail;

    /* Step 3:
    - Sau khi upload img len file temp. Ta can phai di chuyen img upload ve dung folder dinh truoc.
    - renameSync: nhận vào 2 tham số 
        - 1. đường dẫn của file hiện tại
        - 2. đường dẫn mình muốn di chuyển tới
      - path.resolve: giải quyết vấn đề tìm kiếm đến đường dẫn lưu trữ file dễ hơn (giống cơ chế của terminal, đi vào từng cấp thư mục)
    */
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
  }

  // update product
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
