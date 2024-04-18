const express = require("express");
const routes = express.Router();
const superadminController = require("../controllers/superadminController");

routes.post("/superadminsignup", superadminController.superAdminSignup);
routes.post("/superadminlogin", superadminController.superAdminLogin);
routes.get(
  "/getTotalNumberOfReminder",
  superadminController.getTotalNumberOfReminder
);
routes.get("/getTotalNumberOfUser", superadminController.getTotalNumberOfUser);
routes.get(
  "/getNumberOfDailyRemindersCreated",
  superadminController.getNumberOfDailyRemindersCreated
);
routes.get("/getFailedCount", superadminController.getFailedCount);
routes.get("/getSuccessCount", superadminController.getSuccessCount);
routes.get(
  "/getDailyFailedReminders",
  superadminController.getDailyFailedReminders
);
routes.get(
  "/getAllUserReminderData",
  superadminController.getAllUserReminderData
);
routes.get(
  "/getTotalNumberOfSuccessReminders",
  superadminController.getTotalNumberOfSuccessReminders
);

module.exports = routes;
