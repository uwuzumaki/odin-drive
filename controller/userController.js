const db = require("../db/queries");
const byteSize = require("byte-size");
const supabase = require("../supabase/supabase");
const { decode } = require("base64-arraybuffer");

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
  //TODO rename the actual file itself that is stored in the filesystem
  const newFilename = req.body.filename;
  const folder = req.body.folder_id;
  const fileId = req.body.file_id;
  await db.changeFileName(fileId, newFilename);
  res.redirect(`/user/folder/${folder}/${fileId}/details`);
};

const deleteAsset = async (req, res) => {
  //TODO delete the actual file in storage
  const fileId = req.body.file_id;
  const folder = req.body.folder_id;
  await db.deleteFile(fileId);
  res.redirect(`/user/folder/${folder}`);
};

const deleteFolder = async (req, res) => {
  //TODO delete all the associated files
  const folder_id = req.params.folder_id;
  const parent = req.session.parentFolder.id;
  await db.deleteFolder(folder_id);
  res.redirect(`/user/folder/${parent}`);
};

const folderRenameGet = async (req, res) => {
  const parent_folder = req.session.parentFolder;
  const folder_id = req.params.folder_id;
  const folder = await db.getOneFolder(folder_id);
  console.log(folder, parent_folder);
  res.render("folderRenameGet", { parent: parent_folder, folder: folder });
};

const folderRenamePost = async (req, res) => {
  const folderName = req.body.folderName;
  const folder_id = req.body.folder_id;
  const parent_id = req.body.parent_id;
  console.log(req.body);
  await db.changeFolderName(folder_id, folderName);
  res.redirect(`/user/folder/${parent_id}`);
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
  deleteFolder,
  folderRenameGet,
  folderRenamePost,
};
