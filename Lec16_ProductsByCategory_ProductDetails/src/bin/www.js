const app = require("../app/app");
const config = require("config");

// config.get("key_cap1"); chi lay duoc key cap 1
app.listen((port = config.get("app").port), () => {
  console.log("Server running on port " + port);
});
