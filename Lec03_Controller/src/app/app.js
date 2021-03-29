const express = require("express");
const router = require("../routers/web");

// khoi tao bien app gan voi express()
const app = express();

// doc data tu form voi 2 loai data la text, json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// export app để file www.js dùng
module.exports = app;
