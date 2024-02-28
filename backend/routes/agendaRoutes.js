const express = require("express");
const agendaController = require("../controllers/agendaController");

const routes = express.Router();

routes.get("/allreminders", agendaController.allReminders);
routes.get("/allRemindersById/:id", agendaController.allRemindersById);

module.exports = routes;
