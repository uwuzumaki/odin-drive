const db = require("../db/queries");
const byteSize = require("byte-size");

const userHome = async (req, res) => {
  const user = req.user;
  const rootFolder = await db.getRootFolder(user.id);
  req.session.rootFolder = rootFolder;
  req.session.parentFolder = rootFolder;
  const currentFolders = await db.getCurrentFolders(user.id, rootFolder.id);
  const currentFiles = await db.getCurrentFiles(rootFolder.id);
  res.render("user", { folders: currentFolders, files: currentFiles });
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
  const currentFiles = await db.getCurrentFiles(parentFolder.id);
  res.render("user", { folders: currentFolders, files: currentFiles });
};

const backFolder = async (req, res) => {
  const parent_id = req.session.parentFolder.parent_id;
  if (parent_id) {
    res.redirect(`/user/folder/${parent_id}`);
  } else {
    res.redirect("/");
  }
};

const fileDetails = async (req, res) => {
  const file = await db.getFileDetails(req.params.file_id);
  const sizeByte = {
    value: byteSize(file.size).value,
    unit: byteSize(file.size).unit,
  };
  file.size = sizeByte;
  res.render("user", {
    folders: null,
    file: file,
    folder_id: req.params.folder_id,
  });
};

const fileDownload = async (req, res) => {
  console.log("123");
};

const renameGet = async (req, res) => {
  const file = await db.getFileDetails(req.params.file_id);
  res.render("renameGet", { file: file });
};

const renamePost = async (req, res) => {
  console.log(req.body);
};

const deleteAsset = async (req, res) => {
  console.log("456");
};

module.exports = {
  userHome,
  uploadPost,
  newFolder,
  selectFolder,
  backFolder,
  fileDetails,
  fileDownload,
  renameGet,
  deleteAsset,
  renamePost,
};
