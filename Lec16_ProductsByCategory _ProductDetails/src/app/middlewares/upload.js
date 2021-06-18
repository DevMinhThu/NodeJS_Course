const multer = require("multer");
const config = require("config");

const upload = multer({
  dest: config.get("app").temp,
});

module.exports = upload;
