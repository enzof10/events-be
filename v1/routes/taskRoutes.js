const express = require("express");
const taskController = require("../../controllers/taskController");
const router = express.Router();

router
  .get("/", taskController.getAllTasks)

  .get("/:id", taskController.getOneTask)

  .post("/", taskController.createTask)

  .put("/:id", taskController.updateTask)

  .delete("/:id", taskController.deleteTask)

  .delete("/:id/types/:idType", taskController.removeType)

module.exports = router;
