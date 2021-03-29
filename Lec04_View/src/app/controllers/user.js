const Index = (req, res) => {
  res.send("Show user");
};

const Create = (req, res) => {
  res.send("add user");
};

const EditUser = (req, res) => {
  res.send("edit user");
};

const DeleteUser = (req, res) => {
  res.send("delete user");
};

module.exports = {
  index: Index,
  create: Create,
  edit: EditUser,
  delete: DeleteUser,
};
