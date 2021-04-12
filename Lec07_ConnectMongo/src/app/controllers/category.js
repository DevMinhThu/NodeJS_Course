const CategoryModel = require("../models/category");

const Index = (req, res) => {
  res.send("Show categories");
};

const Create = (req, res) => {
  res.send("add categories");
  // thêm data
  const CategoryInsert = new CategoryModel({
    description: "description test",
    title: "Dang An shit",
    slug: "aaaa",
    createdAt: "2020-07-04",
    updatedAt: "2020-07-04",
  });
  CategoryInsert.save();
};

const EditCategory = (req, res) => {
  res.send("edit categories");
};

const DeleteCategory = (req, res) => {
  res.send("delete categories");

  CategoryModel.deleteOne({ _id: "606dc51ff7fa6346c4e135ca" }, (err, docs) => {
    console.log(`This is: ${err}`);
    console.log(docs);
  });
};

module.exports = {
  index: Index,
  create: Create,
  edit: EditCategory,
  delete: DeleteCategory,
};
