const express = require("express");
const agendaController = require("../controllers/agendaController");

const routes = express.Router();

routes.get("/allevents", agendaController.allEvents);
routes.get("/allEventsById/:id",agendaController.allEventsById)

module.exports = routes;
