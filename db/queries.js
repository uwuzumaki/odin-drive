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
  return folder;
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
  return folder;
};

const getCurrentFolders = async (user_id, parent_id) => {
  const id = typeof parent_id == "string" ? parseInt(parent_id) : parent_id;
  const currentFolders = await prisma.folder.findMany({
    where: {
      user_id,
      parent_id: id,
      root: false,
    },
  });
  return currentFolders;
};

module.exports = {
  newUser,
  getUser: getUserByUsername,
  getUserById,
  getRootFolder,
  newFolder,
  getOneFolder,
  getCurrentFolders,
};
