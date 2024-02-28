const express = require("express");
const authController = require("../controllers/userController");
const { userVerification } = require("../middleware/userMiddleware");
const routes = express.Router();

routes.post("/auth/signup", authController.signup);
// routes.post('/signup',(req,res)=>res.send("Hello"))
routes.post("/auth/login", authController.login);

routes.get("/auth/logout", authController.logout);

routes.post("/auth/forget-password", authController.forgetPassword);

routes.post("/auth/reset-password/:id", authController.resetPassword);

routes.get("/getUserById/:id", authController.getUserById);

routes.put("/updateUser", authController.updateUser);

routes.put("/updatepass", authController.updatePass);

module.exports = routes;
