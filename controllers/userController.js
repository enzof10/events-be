const userServices = require("../services/userServices");

const getAllUsers = (req, res) => {
  userServices
    .getAllUsers()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getOneUser = (req, res) => {
  const idUser = Number(req.params.id);
  userServices
    .getOneUser(idUser)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
};

const createUser = (req, res) => {
  userServices
    .createUser(req.body)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateUser = (req, res, next) => {
  const idUser = req.params.id;
  const newUser = req.body;
  userServices
    .updateUser(idUser, newUser)
    .then((task) => {
      res.json(task);
    })
    .catch(next);
};

const deleteUser = (req, res) => {
  const idUser = req.params.id;
  userServices
    .deleteUser(idUser)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
