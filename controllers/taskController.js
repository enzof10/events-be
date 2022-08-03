const { PrismaClient } = require("@prisma/client");
const taskServices = require("../services/taskServices");

const getAllTasks = (req, res) => {
  taskServices
    .getAllTasks()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getOneTask = (req, res) => {
  const idTask = Number(req.params.id);
  taskServices
    .getOneTask(idTask)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
};

const createTask = (req, res) => {
  const prisma = new PrismaClient();
  const { title, content, userId } = req.body;
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
      console.log("task: ", task);
      res.send(task);
    })
    .catch((err) => {
      console.log("err: ", err);
      // envia um erro de status 500
      res.status(500).send({ error: err });
    });
};

const updateTask = (req, res) => {
  const idTask = req.params.id;
  const task = req.body;
  res.send(`update a task with id ${idTask} and ${task}`);
};

const deleteTask = (req, res) => {
  const idTask = req.params.id;
  res.send(`delete a task with id ${idTask}`);
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
