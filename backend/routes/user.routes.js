const router = require("express").Router();
const userController = require("../controllers/user.controller");
const {Auth} = require("../middlewares/auth.middleware");
const {requireUserAuth} = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.config")

// Get a specific user
router.get("/",Auth, userController.getAllUsers);
// Get a specific user
router.get("/:id",Auth, userController.findOne);
// modify a specific user
router.put("/:id",requireUserAuth, userController.update);
// Delete a user
router.delete("/:id",requireUserAuth, userController.deleteUser);
// modify profil picture
router.put("/picture/:id",requireUserAuth,upload.single("image"), userController.updateProfilePicture);


module.exports = router;