const router = require("express").Router();
const userController = require("../controllers/user.controller");
const {Auth} = require("../middlewares/auth.middleware");
const {requireUserAuth} = require("../middlewares/auth.middleware");

// Get a specific user
router.get("/:id",Auth, userController.findOne);
router.put("/:id",requireUserAuth, userController.update);
router.delete("/:id",requireUserAuth, userController.deleteUser);


module.exports = router;