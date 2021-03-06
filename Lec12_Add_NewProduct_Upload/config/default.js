// bat buoc phai export ra Object
module.exports = {
  // config cho app
  app: {
    port: 3000,
    // dường dẫn tới folder views để lấy giao diện
    // __dirname: đường dẫn đang ở trong folder config,
    // "/../src/app/views": đường dẫn để lấy views từ folder config
    views_folder: __dirname + "/../src/app/views",
    view_engine: "ejs",
    static_folder: __dirname + "/../src/public",
    session_key: "minhthu",
    session_secure: false,
    temp: __dirname + "/../temp",
  },
};
