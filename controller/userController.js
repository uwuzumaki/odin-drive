const db = require("../db/queries");

const userHome = (req, res) => {
  const user = req.user;
  res.render("user");
};

const uploadPost = (req, res) => {
  res.redirect("/");
};

const newFolder = async (req, res) => {
  const parent_id = req.hasOwnProperty("parent") ? req.parent.id : null;
  const newFolder = await db.newFolder(req.user.id, parent_id);
  req.parent = newFolder;
  const currentFolders = await db.getCurrentFolders(
    req.user.id,
    req.parent.parent_id,
  );
  console.log(currentFolders);
  res.render("test", { folders: currentFolders });
};

module.exports = {
  userHome,
  uploadPost,
  newFolder,
};
