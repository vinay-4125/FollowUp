const express = require("express");
const routes = express.Router();
const reminderController = require("../controllers/reminderController");

routes.post("/reminder", reminderController.reminder);
routes.get("/addSlack", reminderController.addSlackButton);

module.exports = routes;
