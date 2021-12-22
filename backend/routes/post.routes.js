const router = require("express").Router();
const PostController  = require("../controllers/post.controller");
const {Auth} = require("../middlewares/auth.middleware");
const {requireAuth} = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.config")

// Crete a post
router.post("/",Auth,upload.single("image_url"),PostController.create);
// get All posts
router.get("/",Auth,PostController.getAllPosts);
// update a post
router.put("/:id",requireAuth,upload.single("image_url"),PostController.updatePost);
// delete a post
router.delete("/:id",requireAuth,PostController.deletePost);


// LIKES
// like or unlike a post
router.patch("/:id/likes",Auth,PostController.likeUnlikePost);
//get how many likes a post have
router.get("/likes",Auth,PostController.getLikes);
//get how many likes a post have
router.get("/:id/checkLiked",Auth,PostController.checkLiked);

module.exports = router;