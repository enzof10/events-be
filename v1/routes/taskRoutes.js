const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("Get all tasks");
  })
  .get("/:id", (req, res) => {
    res.send("Get one task");
  })
  .post("/", (req, res) => {
    const prisma = new PrismaClient();
    console.log("req.body: ", req.body);
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
  })
  .put("/:id", (req, res) => {
    res.send("Update a task");
  })
  .delete("/:id", (req, res) => {
    res.send("Delete a task");
  });

module.exports = router;
