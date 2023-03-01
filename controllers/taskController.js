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
  const userId = req.user.id;
  taskServices
    .createTask(req.body, userId)
    .then((task) => {
      res.status(201).json({ data: task });
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).json({ error: err.toString() });
    });
};

const updateTask = (req, res, next) => {
  const idTask = Number(req.params.id);
  if (!idTask) {
    return res.status(400).json({ error: "Missing id" });
  }
  const newTask = req.body;
  taskServices
    .updateTask(idTask, newTask)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).json({ error: err.toString() });
    });
};

const deleteTask = (req, res) => {
  const idTask = Number(req.params.id);
  taskServices
    .deleteTask(idTask)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
};

const removeType = (req, res) => {
  const idTask = Number(req.params.id);
  console.log('idTask: ', idTask);
  const idType = Number(req.params.idType);
  console.log('idType: ', idType);
  if (!idTask || !idType) {
    res.status(401).json({
      message: "idTask and idType are required",
    });
  }
  taskServices
    .removeType(idTask, idType)
    .then((type) => {
      res.status(200).json({
        message: "type removed",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
  removeType,
};
