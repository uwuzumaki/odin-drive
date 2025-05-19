const { Router } = require("express");
const upload = require("../multer/multer");
const userController = require("../controller/userController");

const userRouter = Router();

userRouter.get("/", userController.userHome);
userRouter.post("/upload", upload.single("image"), userController.uploadPost);
userRouter.get("/newfolder", userController.newFolder);
userRouter.get("/folder/:id", userController.selectFolder);
userRouter.get("/back", userController.backFolder);

module.exports = userRouter;
