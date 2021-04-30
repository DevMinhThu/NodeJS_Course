// phan trang
module.exports = (page, totalPage, delta = 2) => {
  // mảng chứa số trang
  const pages = [];

  // mảng chứa số trang va dau ...
  // const pagesWithDot = [];

  const left = page - delta;
  const right = page + delta;

  // push so trang vao mang page.
  for (let i = 1; i <= totalPage; i++) {
    if (i === 1 || i === totalPage || i === page || (i >= left && i <= right)) {
      pages.push(i);
    } else if (i === left - 1 || i === right + 1) {
      pages.push("...");
    }
  }

  // push ... vao mang pages

  return pages;
};
