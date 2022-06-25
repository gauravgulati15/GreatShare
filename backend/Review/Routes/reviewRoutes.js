const express = require('express');
const ReviewController = require("../Controllers/reviewController");

const router = express.Router();

router.route("/all").get(ReviewController.getAllPostsInReviewTable);
router
    .route("/:postID")
    .get(ReviewController.getPostByPostIDFromReviewTable)
    .put(ReviewController.updatePostOfReviewTable)
    .delete(ReviewController.deletePost);

module.exports = router;
