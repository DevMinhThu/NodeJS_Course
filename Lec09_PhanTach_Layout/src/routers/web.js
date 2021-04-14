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

// === test ===
router.get("/test", TestController.testKey);

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
router.get("/admin/login", AuthController.login);
router.post("/admin/login", AuthController.postLogin);

router.get("/admin/logout", AuthController.logout);

router.get("/admin", AdminController.dashboard);

/**===========Users============= */

router.get("/admin/users", UserController.index);

router.get("/admin/users/create", UserController.create);

router.get("/admin/users/edit/:id", UserController.edit);

router.get("/admin/users/delete/:id", UserController.delete);

/**===========Categories============= */
router.get("/admin/categories", CategoryController.index);

router.get("/admin/categories/create", CategoryController.create);

router.get("/admin/categories/edit/:id", CategoryController.edit);

router.get("/admin/categories/delete/:id", CategoryController.delete);

/**===========product============= */
router.get("/admin/products", ProductController.index);

router.get("/admin/products/create", ProductController.create);

router.get("/admin/products/edit/:id", ProductController.edit);

router.get("/admin/products/delete/:id", ProductController.delete);

module.exports = router;
