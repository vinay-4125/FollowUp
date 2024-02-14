const express = require("express");
const authController = require("../controllers/userController");
const routes = express.Router();

routes.post("/signup", authController.signup);
// routes.post('/signup',(req,res)=>res.send("Hello"))
routes.post("/login", authController.login);

routes.get("/logout", authController.logout);


module.exports = routes;

//mtlb css sikha aur udhar implement kiya types
