const db = require("../db/queries");

const userHome = async (req, res) => {
  const user = req.user;
  const rootFolder = await db.getRootFolder(user.id);
  req.session.rootFolder = rootFolder;
  req.session.parentFolder = rootFolder;
  const currentFolders = await db.getCurrentFolders(user.id, rootFolder.id);
  res.render("user", { folders: currentFolders });
};

const uploadPost = async (req, res) => {
  await db.newFile(
    req.file.filename,
    req.file.size,
    req.session.parentFolder.id,
  );
  res.redirect(`/user/folder/${req.session.parentFolder.id}`);
};

const newFolder = async (req, res) => {
  const parent_id = req.session.parentFolder.id;
  const user_id = req.user.id;
  await db.newFolder(user_id, parent_id);
  res.redirect(`/user/folder/${parent_id}`);
};

const selectFolder = async (req, res) => {
  const folder_id = parseInt(req.params.id);
  const parentFolder = await db.getOneFolder(folder_id);
  req.session.parentFolder = parentFolder;
  const currentFolders = await db.getCurrentFolders(req.user.id, folder_id);
  res.render("user", { folders: currentFolders });
};

const backFolder = async (req, res) => {
  const parent_id = req.session.parentFolder.parent_id;
  if (parent_id) {
    res.redirect(`/user/folder/${parent_id}`);
  } else {
    res.redirect("/");
  }
};

module.exports = {
  userHome,
  uploadPost,
  newFolder,
  selectFolder,
  backFolder,
};
