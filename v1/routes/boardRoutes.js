const express = require("express");
const router = express.Router();
const boardController = require("../../controllers/boardController");

router
  .get("/", boardController.getAllBoards)

  .get("/:id", boardController.getOneBoard)

  .post("/", boardController.createBoard)

  .put("/:id", boardController.updateBoard)

  .delete("/:id", boardController.deleteBoard);

module.exports = router;
