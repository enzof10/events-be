const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router
  .get("/", userController.getAllUsers)

  .get("/:id", userController.getOneUser)

  .post("/", userController.createUser)

  .put("/:id", userController.updateUser)
  
  .delete("/:id", userController.deleteUser);

module.exports = router;
