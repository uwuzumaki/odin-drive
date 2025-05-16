const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

const newUser = async (username, password) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  const rootFolder = await prisma.folder.create({
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

const newFolder = async (user_id, parent_id) => {
  const folder = await prisma.folder.create({
    data: {
      user_id,
      parent_id,
    },
  });
  return folder;
};

const getCurrentFolders = async (user_id, parent_id) => {
  const currentFolders = await prisma.folder.findMany({
    where: {
      user_id,
      parent_id,
    },
  });
  return currentFolders;
};

module.exports = {
  newUser,
  getUser: getUserByUsername,
  getUserById,
  newFolder,
  getCurrentFolders,
};
