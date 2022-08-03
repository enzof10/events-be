const { PrismaClient } = require("@prisma/client");
const express = require("express");
const {
  createTask,
  getAllTasks,
  getOneTask,
} = require("../../controllers/taskController");
const router = express.Router();

router
  .get("/", getAllTasks)
  .get("/:id", getOneTask)
  .post("/", createTask)
  .put("/:id", (req, res) => {
    res.send("Update a task");
  })
  .delete("/:id", (req, res) => {
    res.send("Delete a task");
  });

module.exports = router;
