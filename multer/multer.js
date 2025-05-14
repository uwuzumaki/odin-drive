const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, res, cb) => {
    const extArray = res.mimetype.split("/");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      res.fieldname + uniqueSuffix + "." + extArray[extArray.length - 1],
    );
  },
});

module.exports = upload = multer({ storage });
