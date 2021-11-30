const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image_url") cb (null, "./images/posts/");
    else if (file.fieldname === "user_picture") cb (null, "./images/profiles/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

module.exports = upload