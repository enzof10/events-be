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
  taskServices
    .createTask(req.body)
    .then((task) => {
      res.status(201).json({ data: task });
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateTask = (req, res, next) => {
  const idTask = req.params.id;
  const newTask = req.body;
  taskServices
    .updateTask(idTask, newTask)
    .then((task) => {
      res.json(task);
    })
    .catch(next);
};

const deleteTask = (req, res) => {
  const idTask = req.params.id;
  taskServices
    .deleteTask(idTask)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
