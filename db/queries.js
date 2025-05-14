const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

const newUser = async (username, password) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
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

module.exports = {
  newUser,
  getUser: getUserByUsername,
  getUserById,
};
