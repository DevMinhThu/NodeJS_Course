const http = require("http");

// req: client gui yeu cau len server
// res: server tra ket qua ve cho client
const server = http
  .createServer((req, res) => {
    res.write("This is res!"); // tra ve text: this is res!
    res.end(); // ket thuc ket qua tra ve
    console.log("Server running in port: " + port);
  })
  .listen((port = 3000));

// data: nhan gia tri la 1 Object, Object nay chua 2 gia tri la: 2 chuc nang demo1, demo2 (la cac function)
// const data = require("./data");

// console.log(data);
// console.log(data.demo1());

/* Note:

*/
