const router = require("express").Router();
const authController = require("../controllers/auth.controller");
/* const {requireUserAuth} = require('../middlewares/auth.middleware'); */

// AUTH ROUTES //
    // Create a new user
    router.post("/register", authController.create);
    // login
   router.post("/login", authController.login);
   // logout
   router.get("/logout", authController.logout);

   
    module.exports = router;