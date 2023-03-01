const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const typeController = require("../../controllers/typeController")

router
  .get("/", userController.getAllUsers)

  .get("/:id", userController.getOneUser)

  .post("/", userController.createUser)

  .put("/:id", userController.updateUser)
  
  .delete("/:id", userController.deleteUser)

  .get("/:userId/types/", typeController.getTypesByUser)

module.exports = router;
