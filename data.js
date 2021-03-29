const demo1 = () => {
  return "Welcome M.Thu";
};

const demo2 = () => {
  return "Welcome NodeJS";
};

// cu phap dong goi chuc nang de import vao cac file khac su dung
// thuong thi dong goi thanh 1 doi tuong (Object)
// Cu phap Object: key - value
module.exports = {
  demo1: demo1,
  demo2: demo2,
};

/* Note:
=== Khi dong goi nhieu chuc nang ==> export kieu Object

C1: khi chi export 1 function(hay 1 chuc nang)
module.exports = () => {
    return "abc"
}

C2:
const demo2 = () => {
  return "Welcome NodeJS";
};

module.exports = demo2
*/
