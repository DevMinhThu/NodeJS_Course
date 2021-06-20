const Index = (req, res) => {
  res.render("admin/user");
};

const Create = (req, res) => {
  res.render("admin/user/add_user");
};

const EditUser = (req, res) => {
  res.render("admin/user/edit_user");
  console.log(req.params);
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
