const router = require("express").Router();
const PostController  = require("../controllers/comment.controller");
const {Auth} = require("../middlewares/auth.middleware");

// Crete a comment
router.post("/:id",Auth,PostController.createComment);
// get all comments from a post
router.get("/:id",Auth,PostController.getAllComment);
// update a comment
router.put("/:id",Auth,PostController.updateComment);
// delete a comment
router.delete("/:id",Auth,PostController.deleteComment);

module.exports = router;