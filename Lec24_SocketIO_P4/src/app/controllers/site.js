const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const paginate = require("../../common/paginate");

// require thư viện cần thiết cho phương thức xử lý mua hàng
const transporter = require("../../common/transporter");
const config = require("config");
const ejs = require("ejs");
const path = require("path");

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

  // GET CATEGORIES
  const categories = await CategoryModel.find();

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
  const id = req.params.id;

  const category = await CategoryModel.findById(id);
  const title = category.title;

  const productsCategory = await ProductModel.find({
    cat_id: id,
  }).sort({ _id: -1 });

  // tổng số sản phẩm củam 1 danh mục
  const totals = productsCategory.length;

  /*=== Phân trang - paginate ===*/
  // Lấy trang hiện tại
  const page = parseInt(req.query.page) || 1;
  const limit = 9;

  // số document sẽ bị bỏ qua
  const skip = page * limit - limit;
  const total = await ProductModel.find({ cat_id: id }).countDocuments();

  // tổng số page sẽ có
  const totalPages = Math.ceil(total / limit);

  // lấy ra tất cả các sản phẩm thuộc về các danh mục của nó
  const products = await ProductModel.find({ cat_id: id })
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });

  res.render("site/category", {
    products,
    title,
    totals,
    totalPages,
    page,
    skip,
    pages: paginate(page, totalPages),
    slug,
    id,
  });
};

const product = async (req, res) => {
  // const slug = req.params.slug;
  const id = req.params.id;

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
  const keyword = req.query.keywords || "";
  const filter = {};

  if (keyword) {
    // thêm 1 key là $text vào trong object filter
    filter.$text = { $search: keyword };
  }

  /*=== Phân trang - paginate ===*/
  const page = parseInt(req.query.page) || 1;
  const limit = 9;

  // số document sẽ bị bỏ qua
  const skip = page * limit - limit;
  const total = await ProductModel.find(filter).countDocuments();

  // tổng số page sẽ có
  const totalPages = Math.ceil(total / limit);

  // const products = await ProductModel.find(filter);
  const products = await ProductModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });

  res.render("site/search", {
    keyword,
    products,
    totalPages,
    page,
    skip,
    pages: paginate(page, totalPages),
  });
};

const cart = async (req, res) => {
  const products = req.session.cart;

  res.render("site/cart", { products, totalPrice: 0 });
};

const update = (req, res) => {
  // đây là sản phẩm khi add vào giỏ hàng
  const items = req.session.cart;

  // đây là sản phẩm khi click cập nhật
  const products = req.body.products;
  // console.log(items);
  // console.log(products);

  items.map((item) => {
    // kiểm tra nếu tồn tại product mà có id của tk sản phẩm items
    if (products[item.id]) {
      item.qty = +products[item.id]["qty"];
    }
  });

  req.session.cart = items;
  res.redirect("/cart");
};

const delCart = (req, res) => {
  const id = req.params.id;
  const items = req.session.cart;

  console.log(id);
  items.map((item, index) => {
    if (item.id === id) {
      items.splice(index, 1);
    }
  });

  req.session.cart = items;
  res.redirect("/cart");
};

const addToCart = async (req, res) => {
  const body = req.body;
  let items = req.session.cart;

  let isUpdate = false;
  // Mua lại sản phẩm đã mua rồi
  items.map((item) => {
    if (item.id === body.id) {
      isUpdate = true;
      item.qty += parseInt(body.qty);
    }
    return item;
  });

  // Mua một sản phẩm mới
  if (!isUpdate) {
    const product = await ProductModel.findById(body.id);
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.thumbnail,
      qty: parseInt(body.qty),
    });
  }

  // có thể sử dụng được ở toàn app, toàn bộ router
  req.session.cart = items;

  res.redirect("/cart");
};

const order = async (req, res) => {
  const items = req.session.cart;
  const body = req.body;

  // Lấy ra đường dẫn đến thư mục views
  const viewPath = req.app.get("views");

  // Compile(dịch file EJS -> html string) template EJS sang HTML để gửi mail cho khách hàng
  const html = await ejs.renderFile(
    // path.join: nối vào thành 1 đường dẫn
    // viewPath: là đường dẫn tới views
    // từ views đi vào site/email-order.ejs
    path.join(viewPath, "site/email-order.ejs"),
    // truyền data này sang view
    {
      name: body.name,
      phone: body.phone,
      add: body.add,
      totalPrice: 0,
      items,
    }
  );
  // Gửi mail
  await transporter.sendMail({
    to: body.mail,
    from: "MinhThu Shop",
    subject: "Xác nhận đơn hàng từ MinhThu Shop",
    html,
  });

  req.session.cart = [];
  res.redirect("/success");
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
  addToCart: addToCart,
  update: update,
  delCart: delCart,
  order: order,
};
