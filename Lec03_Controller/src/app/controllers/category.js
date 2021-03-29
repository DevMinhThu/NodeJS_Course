const Index = (req, res) => {
  res.send("Show categories");
};

const Create = (req, res) => {
  res.send("add categories");
};

const EditCategory = (req, res) => {
  res.send("edit categories");
};

const DeleteCategory = (req, res) => {
  res.send("delete categories");
};

module.exports = {
  index: Index,
  create: Create,
  edit: EditCategory,
  delete: DeleteCategory,
};
