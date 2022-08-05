const { PrismaClient } = require("@prisma/client");

const getAllTasks = () => {
  const prisma = new PrismaClient();
  return prisma.task.findMany();
};

const getOneTask = (idTask) => {
  const prisma = new PrismaClient();
  return prisma.task.findMany({
    where: {
      id: idTask,
    },
  });
};

const createTask = (task) => {
  const prisma = new PrismaClient();
  const { title, content, userId } = task;
  return prisma.task.create({
    data: {
      title,
      content,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const updateTask = (idTask, newTask) => {
  const prisma = new PrismaClient();
  const { title, content } = newTask;
  return prisma.task.update({
    where: {
      id: idTask,
    },
    data: {
      title,
      content,
    },
  });
};

const deleteTask = (idTask) => {
  const prisma = new PrismaClient();
  return prisma.task.delete({
    where: {
      id: idTask,
    },
  });
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
