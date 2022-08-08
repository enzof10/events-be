const userServices = require("../services/userServices");

const getAllUsers = (req, res) => {
  userServices
    .getAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getOneUser = (req, res) => {
  const idUser = Number(req.params.id);
  userServices
    .getOneUser(idUser)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

const createUser = (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.email || !newUser.password) {
    return res.status(400).send({
      message: "Name, email and password are required",
    });
  }

  userServices
    .createUser(newUser)
    .then((newUser) => {
      res.json(newUser);
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
    .then((newUser) => {
      res.json(newUser);
    })
    .catch(next);
};

const deleteUser = (req, res) => {
  const idUser = req.params.id;
  userServices
    .deleteUser(idUser)
    .then((deleted) => {
      res.json(deleted);
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
