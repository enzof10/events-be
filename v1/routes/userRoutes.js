const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("Get all users");
  })
  .get("/:id", (req, res) => {
    res.send("Get one user");
  })
  .post("/", (req, res) => {
    const prisma = new PrismaClient();
    console.log("req.body: ", req.body);
    const { name, email, password } = req.body;
    prisma.user
      .create({
        data: {
          name,
          email,
          password,
        },
      })
      .then((user) => {
        console.log("user: ", user);
        res.send(user);
      })
      .catch((err) => {
        console.log("err: ", err);
        // envia um erro de status 500
        res.status(500).send({ error: err });
      });
  })
  .put("/:id", (req, res) => {
    const prisma = new PrismaClient();
    console.log("req.body: ", req.body);
    const { name, email, password } = req.body;
    prisma.user

      .update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name,
          email,
          password,
        },
      })
      .then((user) => {
        console.log("user: ", user);
        res.send(user);
      })
      .catch((err) => {
        console.log("err: ", err);
        // envia um erro de status 500
        res.status(500).send({ error: err });
      });
  })
  .delete("/:id", (req, res) => {
    res.send("Delete a user");
  });

module.exports = router;
