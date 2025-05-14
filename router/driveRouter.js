const { Router } = require("express");
const driveController = require("../controller/driveController");
const registration = require("../validation/registration");

const driveRouter = Router();

driveRouter.get("/", driveController.index);
driveRouter.get("/register", driveController.registerGet);
driveRouter.get("/login", driveController.loginGet);
driveRouter.post("/register", registration, driveController.registerPost);
driveRouter.post("/login", driveController.loginPost);
driveRouter.get("/logout", driveController.logout);

module.exports = driveRouter;
