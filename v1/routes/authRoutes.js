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

  .post("/forgotpassword", authController.forgotpassword)

  .post("/resetpassword/:token", authController.resetpassword)

  .post("/verifytoken", authController.verifytoken)

module.exports = router;
