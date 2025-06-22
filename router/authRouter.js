const { Router } = require("express");
const authController = require("../controller/authController");
const registration = require("../validation/registration");

const authRouter = Router();

authRouter.get("/", authController.index);
authRouter.get("/register", authController.registerGet);
authRouter.post("/register", registration, authController.registerPost);
authRouter.post("/login", authController.loginPost);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
