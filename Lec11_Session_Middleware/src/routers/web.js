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

// require middleware
const authMiddleware = require("../app/middlewares/auth");

// === test ===
// la mot tham so nam truoc controller
router.get(
  "/test",
  // (req, res, next) => {

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

router.get(
  "/admin/products/edit/:id",
  authMiddleware.checkAdmin,
  ProductController.edit
);

router.get(
  "/admin/products/delete/:id",
  authMiddleware.checkAdmin,
  ProductController.delete
);

module.exports = router;
