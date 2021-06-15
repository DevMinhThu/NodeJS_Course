const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");

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
