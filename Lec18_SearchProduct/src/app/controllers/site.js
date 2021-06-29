const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const paginate = require("../../common/paginate");

const home = async (req, res) => {
  /* GET PRODUCT LATEST
  - sản phẩm mới nhất hiển thị ra thì phải là sản phẩm còn hàng.
   => is_stock phải là true (còn hàng)
  - Và chỉ lấy 6 sản phẩm nổi bật => dùng limit(6)
    - 6: là số sản phẩm muốn lấy ra để hiển thị
  => Tìm trong db những sản phẩm có is_stock = true và truyền sang view
  */
  const LatestProducts = await ProductModel.find({ is_stock: true })
    .sort({ _id: -1 })
    .limit(6);

  // console.log(LatestProducts);

  /* GET  FEATURED PRODUCT
  - sản phẩm nổi bật, là sản phẩm có 
    - is_stock = true (còn hàng)
    - feature = true (nổi bật)
  - Và chỉ lấy 6 sản phẩm nổi bật => dùng limit
  => Tương tự như sản phẩm mới nhất
  */
  const FeaturedProducts = await ProductModel.find({
    is_stock: true,
    featured: true,
  }).limit(6);

  res.render("site/index", {
    LatestProducts: LatestProducts,
    FeaturedProducts: FeaturedProducts,
  });
};

const category = async (req, res) => {
  /* 
  - lấy lại tham số slug và id trên url
  - Cú pháp: req.params
  */
  const slug = req.params.slug;
  const id = req.params.id; // id cua category

  // lấy ra tất cả sản phẩm có id(cat_id) bằng id của danh mục sản phẩm đó
  const productsCategory = await ProductModel.find({
    cat_id: id,
  }).sort({ _id: -1 });

  // lấy ra tổng số sản phẩm của 1 danh mục
  const totals = productsCategory.length;

  // lấy ra tên danh mục
  const category = await CategoryModel.findById(id);
  const title = category.title;

  /* === pagination === */
  // lấy lại số trang hiện tại trên URL, nếu không thì là trang 1
  // Phương thức parseInt() sẽ phân tích một chuỗi và trả về một số nguyên nếu có thể.
  const page = parseInt(req.query.page) || 1;

  // số document trên 1 trang
  const limit = 9;

  // số document sẽ bị bỏ qua
  const skip = page * limit - limit;

  // tổnng số document
  const total = await ProductModel.find({ cat_id: id }).countDocuments();

  // tính tổng số trang (sẽ bằng tổng số document / số document trên 1 trang)
  const totalPage = Math.ceil(total / limit);

  // lấy ra số document
  const products = await ProductModel.find({ cat_id: id })
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });

  res.render("site/category", {
    products,
    totals,
    title,
    slug,
    id,
    pages: paginate(page, totalPage),
    page,
    skip,
    totalPage,
  });
};

const product = async (req, res) => {
  const id = req.params.id; // id của mỗi sản phẩm

  const product = await ProductModel.findById(id);

  const comments = await CommentModel.find({ prd_id: id });

  res.render("site/product", { product, comments });
};

const comment = async (req, res) => {
  const id = req.params.id;

  const comment = {
    prd_id: id,
    full_name: req.body.full_name,
    email: req.body.email,
    body: req.body.body,
  };
  // console.log(comment);

  await new CommentModel(comment).save();

  // Chứa path của URL
  res.redirect(req.path);
};

const search = async (req, res) => {
  // lấy keyword trên URL khi gõ vào input.
  const keyword = req.query.keywords || "";
  const filter = {};

  if (keyword) {
    filter.$text = { $search: keyword };
  }

  // === paginate ===
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const skip = page * limit - limit;

  const total = await ProductModel.find(filter).countDocuments();

  const totalPage = Math.ceil(total / limit);

  const products = await ProductModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });

  res.render("site/search", {
    products,
    keyword,
    pages: paginate(page, totalPage),
    page,
    skip,
    totalPage,
  });
};

const cart = async (req, res) => {
  res.render("site/cart");
};

const success = async (req, res) => {
  res.render("site/success");
};

module.exports = {
  home: home,
  category: category,
  product: product,
  search: search,
  cart: cart,
  success: success,
  comment: comment,
};
