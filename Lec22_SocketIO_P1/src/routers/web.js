const express = require("express");
const router = express.Router();

// call controller tu folder controller
// TestController chinh la mot object {testKey: test}
const TestController = require("../app/controllers/test");
const AuthController = require("../app/controllers/auth");
const AdminController = require("../app/controllers/admin");
const ProductController = require("../app/controllers/product");
const UserController = require("../app/controllers/user");
const CategoryController = require("../app/controllers/category");

// controller front-end
const SiteController = require("../app/controllers/site");

// controller chat
const ChatController = require("../app/controllers/chat");

// require middleware
const authMiddleware = require("../app/middlewares/auth");
const uploadMiddleware = require("../app/middlewares/upload");

// require upload
var multer = require("multer");
// cau hinh folder temp de chua file vua upload len
var upload = multer({
  // đường dẫn tới file chứa tạm la temp
  dest: __dirname + "/../../temp",
});

// upload file
router.get("/upload", TestController.frmUpload);
/* 
  - upload.single("file_upload") là một middleware, voi file_upload la name trong form
  - trong controller fileUpload chỉ có 1 công viêc là di chuyển file vừa upload vào temp dến thư mục muốn lưu trữ.
  - single la upload 1 file
*/
router.post("/upload", upload.single("file_upload"), TestController.fileUpload);

// === test ===
// la mot tham so nam truoc controller
// sau khi kiem tra trong middleware xong nếu thỏa mãn, hàm next() sẽ chuyển tiếp chạy controller
// khi use /test sẽ chạy middleware log ra "run test" rồi chạy đến controller
router.get(
  "/test",
  // (req, res, next) => {
  //   console.log("run test");
  //   next();
  // },
  TestController.testKey
);
router.get("/test2", TestController.testKey2);
router.get("/test3", TestController.testKey3);

// === form Login ===
router.get("/form", (req, res) => {
  res.send(`
    <form method="post">
      <input type="text" name="emailForm"/>
      <input type="text" name="passForm"/>
      <input type="submit" name="sbm" value="Log In"/>
    </form>
  `);
});
// res data tu form Log In
router.post("/form", (req, res) => {
  const email = req.body.emailForm;
  const pass = req.body.passForm;

  res.send(`
    Email: ${email} <br>
    Pass: ${pass}
  `);
});

/* === router chat === */
router.get("/chat", authMiddleware.checkUser, ChatController.chat);

/* ============== router SITE-FRONTEND============= */
router.get("/", SiteController.home);
// truyen param :slug,:id
// slug, id sẽ nhận lại giá trị bên file menu
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);
router.get("/search", SiteController.search);
router.get("/cart", SiteController.cart);
router.post("/order", SiteController.order);
router.post("/update-cart", SiteController.update);
router.get("/dell-cart-:id", SiteController.delCart);
router.post("/add-to-cart", SiteController.addToCart);
router.get("/success", SiteController.success);

/* === router BACK-END === */
/**===========Login-Logout============= */
router.get("/admin/login", authMiddleware.checkLogin, AuthController.login);
router.post(
  "/admin/login",
  authMiddleware.checkLogin,
  AuthController.postLogin
);

router.get("/admin/logout", authMiddleware.checkAdmin, AdminController.logout);

router.get("/admin", authMiddleware.checkAdmin, AdminController.dashboard);

/**===========Users============= */

router.get("/admin/users", authMiddleware.checkAdmin, UserController.index);

router.get(
  "/admin/users/create",
  authMiddleware.checkAdmin,
  UserController.create
);

router.get(
  "/admin/users/edit/:id",
  authMiddleware.checkAdmin,
  UserController.edit
);

router.get(
  "/admin/users/delete/:id",
  authMiddleware.checkAdmin,
  UserController.delete
);

/**===========Categories============= */
router.get(
  "/admin/categories",
  authMiddleware.checkAdmin,
  CategoryController.index
);

router.get(
  "/admin/categories/create",
  authMiddleware.checkAdmin,
  CategoryController.create
);

router.get(
  "/admin/categories/edit/:id",
  authMiddleware.checkAdmin,
  CategoryController.edit
);

router.get(
  "/admin/categories/delete/:id",
  authMiddleware.checkAdmin,
  CategoryController.delete
);

/**===========product============= */
router.get(
  "/admin/products",
  authMiddleware.checkAdmin,
  ProductController.index
);

router.get(
  "/admin/products/create",
  authMiddleware.checkAdmin,
  ProductController.create
);

router.post(
  "/admin/products/store",
  authMiddleware.checkAdmin,
  uploadMiddleware.single("thumbnail"),
  ProductController.store
);

router.get(
  "/admin/products/edit/:id",
  authMiddleware.checkAdmin,
  ProductController.edit
);

router.post(
  "/admin/products/update/:id",
  authMiddleware.checkAdmin,
  uploadMiddleware.single("thumbnail"),
  ProductController.update
);

router.get(
  "/admin/products/delete/:id",
  authMiddleware.checkAdmin,
  ProductController.delete
);

module.exports = router;
