const userHome = (req, res) => {
  const user = req.user;
  res.render("user");
};

const uploadPost = (req, res) => {
  res.redirect("/");
};

module.exports = {
  userHome,
  uploadPost,
};
