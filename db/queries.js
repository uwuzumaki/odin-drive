const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

const newUser = async (username, password) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  await prisma.folder.create({
    data: {
      user_id: user.id,
      root: true,
    },
  });
  return user;
};

const getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

const getRootFolder = async (id) => {
  const folder = await prisma.folder.findMany({
    where: {
      user_id: id,
      root: true,
    },
  });
  return folder[0];
};

const newFolder = async (user_id, parent_id) => {
  const folder = await prisma.folder.create({
    data: {
      user_id,
      parent_id,
    },
  });
  return folder;
};

const getOneFolder = async (id) => {
  const folder_id = typeof id == "string" ? parseInt(id) : id;
  const folder = await prisma.folder.findMany({
    where: {
      id: folder_id,
    },
  });
  return folder[0];
};

const getCurrentFolders = async (user_id, parent_id) => {
  let currentFolders;
  if (parent_id) {
    currentFolders = await prisma.folder.findMany({
      where: {
        user_id,
        parent_id,
      },
    });
  } else {
    currentFolders = await getRootFolder(user_id);
  }
  return currentFolders;
};

const newFile = async (filename, size, folder_id) => {
  const record = await prisma.file.create({
    data: {
      name: filename,
      size,
      folder_id,
    },
  });
};

const getCurrentFiles = async (folder_id) => {
  const files = await prisma.file.findMany({
    where: {
      folder_id,
    },
  });
  return files;
};

module.exports = {
  newUser,
  getUser: getUserByUsername,
  getUserById,
  getRootFolder,
  newFolder,
  getOneFolder,
  getCurrentFolders,
  newFile,
  getCurrentFiles,
};
