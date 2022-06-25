const express = require('express');
const CommentsController = require("../Controllers/commentsController");

const router = express.Router();

router.route("/").get(CommentsController.getComments);
router.route("/").post(CommentsController.createComment);
router.route("/:postID").get(CommentsController.getCommentByPostID);
router
    .route("/:commentID")
    .delete(CommentsController.deleteComment)
    .put(CommentsController.updateComment);

module.exports = router;
