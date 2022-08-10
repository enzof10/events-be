const boardServices = require("../services/boadServices");

const getAllBoards = (req, res) => {
  boardServices
    .getAllBoards()
    .then((boards) => {
      res.json(boards);
    })
    .catch((err) => {
      res.json(err);
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
    console.log('req: ', req);
  boardServices
    .createBoard(req.body)
    .then((board) => {
      res.json(board);
    })
    .catch((err) => {
      res.json(err);
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
