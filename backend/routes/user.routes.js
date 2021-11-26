const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

// Get a specific user
router.get("/:id",auth, userController.findOne);


module.exports = router;