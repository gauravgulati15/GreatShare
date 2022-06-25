const express = require('express');
const UserController = require("../Controllers/userController");

const router = express.Router();

router.route("/").get(UserController.getAllUsers);
router.route("/").post(UserController.createUser);
router
    .route("/:userID")
    .get(UserController.getUserDetailsByUserID)
    .delete(UserController.deleteUser)
    .put(UserController.updateUserDetails);

router.route("/userDetailsByEmailID/:emailID").get(UserController.getUserDetailsByEmailID);

module.exports = router;
