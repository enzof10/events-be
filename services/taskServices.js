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

const createTask = (task, userId) => {
  const prisma = new PrismaClient();
  const { title, boardId } = task;
  console.log("task: ", task);
  return prisma.task.create({
    data: {
      title,
      description: "",
      board: {
        connect: {
          id: boardId,
        },
      },
    },
  });
};

const updateTask = async (idTask, newTask) => {
  const prisma = new PrismaClient();
  let { title, description, types, date } = newTask;

  console.time("updateTask");
  types.map(async (type) => {
    if (!type.id) {
      const typeInserted = await prisma.type.create({
        data: {
          name: type.name,
          color: type.color,
          taks: {
            create: [
              {
                assignedBy: "null",
                assignedAt: new Date(),
                task: {
                  connect: {
                    id: idTask,
                  },
                },
              },
            ],
          },
        },
      });
    } else {
      const typeUpdated = await prisma.type.update({
        where: {
          id: type.id,
        },
        data: {
          name: type.name,
          color: type.color,
        },
      });
    }
  });
  console.timeEnd("updateTask");

  return prisma.task.update({
    where: {
      id: idTask,
    },
    data: {
      title,
      description,
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
