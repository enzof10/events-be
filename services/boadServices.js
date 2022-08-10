const { PrismaClient } = require("@prisma/client");

const getAllBoards = () => {
  const prisma = new PrismaClient();
  return prisma.board.findMany();
};

const getOneBoard = (idBoard) => {
  const prisma = new PrismaClient();
  return prisma.board.findMany({
    where: {
      id: idBoard,
    },
  });
};

const createBoard = (task) => {
  const prisma = new PrismaClient();
  const { name, userId } = task;
  return prisma.board.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const updateBoard = (idBoard, newBoard) => {
  const prisma = new PrismaClient();
  const { name } = newBoard;
  return prisma.board.update({
    where: {
      id: idBoard,
    },
    data: {
      name,
    },
  });
};

const deleteBoard = (idBoard) => {
  const prisma = new PrismaClient();
  return prisma.board.delete({
    where: {
      id: idBoard,
    },
  });
};

module.exports = {
  getAllBoards,
  getOneBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
