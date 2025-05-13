const { Router } = require("express");
const driveController = require("../controller/driveController");

const driveRouter = Router();

driveRouter.get("/", driveController.index);
driveRouter.get("/register", driveController.registerGet);

module.exports = driveRouter;
