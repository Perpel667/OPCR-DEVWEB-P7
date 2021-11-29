const router = require("express").Router();
const PostController  = require("../controllers/post.controller");
const {Auth} = require("../middlewares/auth.middleware");
const {requireAuth} = require("../middlewares/auth.middleware");

// Crete a post
router.post("/",Auth,PostController.create);
// get All posts
router.get("/",Auth,PostController.getAllPosts);
// update a post
router.put("/:id",requireAuth,PostController.updatePost);


module.exports = router;