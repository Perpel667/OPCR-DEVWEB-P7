const router = require("express").Router();
const userController = require("../controllers/user.controller");
const {requireUserAuth} = require('../middlewares/auth.middleware');

// USER CRUD //
    // Create a new user
    router.post("/register", userController.create);
    // Get all users
    router.get("/", userController.findAll);
    // Get a specific user
    router.get("/:id", userController.findOne);
    // modify user's profile
    router.put("/:id",requireUserAuth, userController.update);
   // delete user
   router.delete("/:id",requireUserAuth, userController.delete);
   
    module.exports = router;