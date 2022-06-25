const express = require('express');
const ModeratorController = require("../Controllers/moderatorController");

const router = express.Router();

router.route("/all").get(ModeratorController.getAllPostsInModerationTable);
router
    .route("/")
    .get(ModeratorController.getLimitedOldestPost)
    .post(ModeratorController.createPost);
router.route("/transfer").put(ModeratorController.transferPostFromModeratorToPostTable);
router.route("/transferReview").put(ModeratorController.transferPostFromModeratorToReviewTable);

module.exports = router;
