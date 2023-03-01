const { prisma } = require("./../prisma/prismaStore")
const getAllBoards = () => {
  return prisma.board.findMany({
    select: {
      id: true,
      name: true,
      tasks: {
        include: {
          types: {
            select:{
              type: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const getOneBoard = (idBoard) => {
  const prisma = new PrismaClient();
  return prisma.board.findMany({
    where: {
      id: idBoard,
    },
  });
};

const createBoard = (task, userId) => {
  const { name } = task;

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

const deleteBoard = async (idBoard) => {
  console.log("idBoard: ", idBoard);
  prisma.board
    .findMany({
      where: {
        id: idBoard,
      },
    })
    .then((board) => {
      console.log("board: ", board);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
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
