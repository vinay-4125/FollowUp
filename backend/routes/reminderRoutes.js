const express = require("express");
const routes = express.Router();
const reminderController = require("../controllers/reminderController");

routes.post("/reminder", reminderController.reminder);
routes.get("/upcomingreminder/:userId", reminderController.findUpcomingEvents);

module.exports = routes;
