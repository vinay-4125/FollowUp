const express = require("express");
const memberController = require("../controllers/memberController");

const routes = express.Router();

routes.post("/addmember", memberController.addMembers);
routes.get("/getmembers", memberController.getMembers);
routes.get("/getMemberFullname", memberController.getMemberFullname);
routes.put("/updatemember", memberController.updateMember);
routes.delete("/deletemember", memberController.deleteMember);

module.exports = routes;
