const express = require("express");
const router = require("../routers/web");
const config = require("config");

// khoi tao bien app gan voi express()
const app = express();

// cấu hình
// đường dẫn khi gõ key "views" để lấy được theme từ folder views
app.set("views", config.get("app").views_folder);
// thông báo cho app là sử dụng template ejs
app.set("view engine", config.get("app").view_engine);

// đường dẫn tới các file tĩnh (css,....)
// /static đang là thư mục public
app.use("/static", express.static(config.get("app").static_folder));

// doc data tu form voi 2 loai data la text, json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config router in app
app.use(router);

// export app để file www.js dùng
module.exports = app;
