const express = require("express");
const router = require("../routers/web");
const config = require("config");
const session = require("express-session");

// khoi tao bien app gan voi express()
const app = express();

// cấu hình
// cấu hình key "views" và đường dẫn tới folder views
// bắt đầu từ thư mục "views"
app.set("views", config.get("app").views_folder);
// thông báo cho app là sử dụng template ejs
app.set("view engine", config.get("app").view_engine);

// đường dẫn tới các file tĩnh (css,....)
// /static đang là thư mục public
app.use("/static", express.static(config.get("app").static_folder));

// doc data tu form voi 2 loai data la text, json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config session
app.set("trust proxy", 1); // trust first proxy
const sessionDriver = session({
  secret: config.get("app").session_key,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: config.get("app").session_secure },
});
app.use(sessionDriver);

// vì sử dụng session nên phải khai baso ớ dưới cấu hình session
app.use(require("../app/middlewares/cart"));

// middleware share cho toàn app
app.use(require("../app/middlewares/share"));

app.use(router);

// export app để file www.js dùng
module.exports = app;
app.session = sessionDriver;
