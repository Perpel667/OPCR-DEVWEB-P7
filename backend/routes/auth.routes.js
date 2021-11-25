const router = require("express").Router();
const authController = require("../controllers/auth.controller");
/* const {requireUserAuth} = require('../middlewares/auth.middleware'); */

// USER CRUD //
    // Create a new user
    router.post("/register", authController.create);

   
    module.exports = router;