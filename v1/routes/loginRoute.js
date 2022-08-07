const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const loginController = require("../../controllers/loginController");

router
  .post("/",loginController.login)
  .post("/signup", async (req, res) => {
    const { body } = req;
    const prisma = new PrismaClient();
    const user = await prisma.user.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "User already exists",
      });
    }
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  })
  .post("/signin", async (req, res) => {
    const { body } = req;
    const prisma = new PrismaClient();
    const user = await prisma.user.findOne({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Password is not valid",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  });

module.exports = router;
