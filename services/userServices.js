const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const getAllUsers = () => {
  const prisma = new PrismaClient();
  return prisma.user.findMany();
};

const getOneUser = (idUser) => {
  const prisma = new PrismaClient();
  return prisma.user.findMany({
    where: {
      id: idUser,
    },
  });
};

const createUser = (user) => {
  const prisma = new PrismaClient();
  const { name, email, password } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

const updateUser = (idUser, newUser) => {
  const prisma = new PrismaClient();
  const { name, email, password } = newUser;
  return prisma.user.update({
    where: {
      id: idUser,
    },
    data: {
      name,
      email,
      password,
    },
  });
};

const deleteUser = (idUser) => {
  const prisma = new PrismaClient();
  return prisma.user.delete({
    where: {
      id: idUser,
    },
  });
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
