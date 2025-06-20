const { Router } = require("express");
const upload = require("../multer/multer");
const userController = require("../controller/userController");

const userRouter = Router();

userRouter.get("/", userController.userHome);
userRouter.post("/upload", upload.single("file"), userController.uploadPost);
userRouter.get("/newfolder", userController.newFolder);
userRouter.get("/folder/:id", userController.selectFolder);
userRouter.get("/back", userController.backFolder);
userRouter.get(
  "/folder/:folder_id/:file_id/details",
  userController.fileDetails,
);
userRouter.get("/:file_id/download", userController.fileDownload);
userRouter.get("/:file_id/rename", userController.renameGet);
userRouter.post("/:file_id/rename", userController.renamePost);
userRouter.post("/file/delete", userController.deleteAsset);
userRouter.get("/folder/:folder_id/delete", userController.deleteFolder);
userRouter.get("/folder/:folder_id/rename", userController.folderRenameGet);
userRouter.post("/folder/:folder_id/rename", userController.folderRenamePost);

module.exports = userRouter;
