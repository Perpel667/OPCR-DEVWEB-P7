const router = require("express").Router();
const PostController  = require("../controllers/post.controller");
const {Auth} = require("../middlewares/auth.middleware");
const {requireAuth} = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.config")

// Crete a post
router.post("/",upload.single("image_url"),Auth,PostController.create);
// get All posts
router.get("/",Auth,PostController.getAllPosts);
// update a post
router.put("/:id",upload.single("image_url"),PostController.updatePost);
// delete a post
router.delete("/:id",requireAuth,PostController.deletePost);


// LIKES

router.patch("/:id/likes",Auth,PostController.likeUnlikePost);

module.exports = router;