const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authController = require("../../controllers/authController");

router
  .post("/signin",authController.signin)
  .post("/signup",authController.signup)
  .post("/changepassword", authController.changepassword)
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
