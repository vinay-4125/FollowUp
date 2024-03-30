const express = require("express");
const routes = express.Router();
const superadminController = require("../controllers/superadminController");

routes.get(
  "/getTotalNumberOfReminder",
  superadminController.getTotalNumberOfReminder
);
routes.get("/getTotalNumberOfUser", superadminController.getTotalNumberOfUser);
routes.get(
  "/getNumberOfDailyRemindersCreated",
  superadminController.getNumberOfDailyRemindersCreated
);

module.exports = routes;
