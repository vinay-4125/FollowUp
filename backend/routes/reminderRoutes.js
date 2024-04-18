const express = require("express");
const routes = express.Router();
const reminderController = require("../controllers/reminderController");

routes.post("/reminder", reminderController.reminder);
routes.get("/upcomingreminder/:userId", reminderController.findUpcomingEvents);
routes.get("/getReminderDataById/:id", reminderController.findReminderById);
routes.put("/updatereminder", reminderController.updateReminder);
routes.delete("/deletereminder", reminderController.deleteReminderById);
routes.delete(
  "/singleAgendaJobsDeleteDocument",
  reminderController.singleAgendaJobsDeleteDocument
);
routes.delete(
  "/deleteReminderFromAgendaJobs",
  reminderController.deleteReminderFromAgendaJobs
);
// routes.get(
//   "/getSuccessReminderByUserId",
//   reminderController.getSuccessReminderByUserId
// );
module.exports = routes;
