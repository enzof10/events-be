const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/eventController");

router
  .get("/", eventController.getAllEvents)

  .get("/:id", eventController.getOneEvent)

  .post("/", eventController.createEvent)

  .put("/:id", eventController.updateEvent)

  .delete("/:id", eventController.deleteEvent);

module.exports = router;
