const mongoose = require("mongoose");

// connect voi database vp_shop_project_name
module.exports = () => {
  mongoose.connect("mongodb://localhost/vp_shop_project_name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  // de file khac co object mongoose de su dung
  return mongoose;
};

// nếu tk khác gọi vào file này, nó sẽ vừa được kết nối với database vừa có được đối tượng mongoose
