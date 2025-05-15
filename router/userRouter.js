const { Router } = require("express");
const upload = require("../multer/multer");
const userController = require("../controller/userController");

const userRouter = Router();

userRouter.get("/:id", userController.userHome);
userRouter.post("/upload", upload.single("image"), userController.uploadPost);

module.exports = userRouter;
