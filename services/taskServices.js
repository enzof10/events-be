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
  prisma.task
    .create({
      data: {
        title,
        content,
        user: {

          connect: {
            id: userId,
          },
        },
      },
    })
    .then((task) => {
      return task;
    })
    .catch((err) => {
      return {
        error: true,
        mesagge: err,
      };
    });
};

const updateTask = (idTask, newTask) => {
  const prisma = new PrismaClient();
  prisma.task
    .update({
      where: {
        id: idTask,
      },
      data: {
        title: newTask.title,
        content: newTask.content,
        user: {
          connect: {
            id: newTask.userId,
          },
        },
      },
    })
    .then((task) => {
      return task;
    })
    .catch((err) => {
      return {
        error: true,
        mesagge: err,
      };
    });
};

const deleteTask = (idTask) => {
  const prisma = new PrismaClient();
  prisma.task
    .delete({
      where: {
        id: idTask,
      },
    })
    .then((task) => {
      return task;
    })
    .catch((err) => {
      return {
        error: true,
        mesagge: err,
      };
    });
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
