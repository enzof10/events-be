const boardServices = require("../services/boadServices");

const getAllBoards = (req, res) => {
  boardServices
    .getAllBoards()
    .then((boards) => {
      res.status(200).json({ data: boards });
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).json({ error: true, message: err.toString() });
    });
};

const getOneBoard = (req, res) => {
  const idTask = Number(req.params.id);
  boardServices
    .getOneBoard(idTask)
    .then((board) => {
      res.json(board);
    })
    .catch((err) => {
      res.json(err);
    });
};

const createBoard = (req, res) => {
  const userId = req.user.id;
  boardServices
    .createBoard(req.body, userId)
    .then((board) => {
      res.status(201).json({ data: board });
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).json({ error: err.toString() });
    });
};

const updateBoard = (req, res, next) => {
  const idTask = req.params.id;
  const newTask = req.body;
  boardServices
    .updateBoard(idTask, newTask)
    .then((board) => {
      res.json(board);
    })
    .catch(next);
};

const deleteBoard = (req, res) => {
  const idTask = req.params.id;
  boardServices
    .deleteBoard(idTask)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  getAllBoards,
  getOneBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
