const db = require("../db/queries");

const userHome = async (req, res) => {
  const user = req.user;
  const rootFolder = await db.getRootFolder(user.id);
  req.session.rootFolder = rootFolder;
  req.session.parentFolder = rootFolder;
  const currentFolders = await db.getCurrentFolders(user.id, rootFolder.id);
  console.log("home", req.session.parentFolder);
  res.render("user", { folders: currentFolders });
};

const uploadPost = (req, res) => {
  res.redirect("/");
};

const newFolder = async (req, res) => {
  const parent_id = req.session.parentFolder.id;
  const user_id = req.user.id;
  await db.newFolder(user_id, parent_id);
  // const currentFolders = await db.getCurrentFolders(user_id, parent_id);
  res.redirect(`/user/folder/${parent_id}`);
};

const selectFolder = async (req, res) => {
  const folder_id = req.params.id;
  const parentFolder = await db.getOneFolder(folder_id);
  req.session.parentFolder = parentFolder[0];
  const currentFolders = await db.getCurrentFolders(req.user.id, req.params.id);
  res.render("user", { folders: currentFolders });
};

module.exports = {
  userHome,
  uploadPost,
  newFolder,
  selectFolder,
};
