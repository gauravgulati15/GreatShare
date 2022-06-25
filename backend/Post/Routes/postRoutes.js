const express = require('express');
const PostController = require("../Controllers/postController");

const router = express.Router();

router.route("/all").get(PostController.getAllPostsInPostTable);
router
    .route("/:postID")
    .get(PostController.getPostByPostID)
    .put(PostController.updatePost)
    .delete(PostController.deletePost);
router.route("/increaseLikes/:postID").put(PostController.increasePostLikes);

module.exports = router;
