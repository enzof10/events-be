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

const updateTask = (idTask, newTask) => {
  const prisma = new PrismaClient();
  let { title, description, type, date } = newTask;
  console.log('date: ', date);
  console.log('types: ', type);
  console.log('description: ', description);
  console.log('title: ', title);

  date = date ? date : "null";
  

  // recorre los types y los inserta

  for (item of type) {
    console.log(item);
    prisma.item.upsert({
      where: {
        id: item.id,
      },
      create: {
        task_id: idTask,
        name: item.name,
        color: item.color,
      },
      update: {
        task_id: idTask,
        name: item.name,
        color: item.color,
      },
    });
  }

  return prisma.task.update({
    where: {
      id: idTask,
    },
    data: {
      title,
      description,
      type: {
        connect: type,
      },
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
