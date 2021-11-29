const router = require("express").Router();
const PostController  = require("../controllers/post.controller");
const {Auth} = require("../middlewares/auth.middleware");

// Crete a post
router.post("/",Auth,PostController.create);


module.exports = router;