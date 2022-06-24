const express = require('express');
const NotificationController = require("../Controllers/notificationController");

const router = express.Router();

router.route("/").get(NotificationController.getAllNotifications);
router.route("/:notificationID").delete(NotificationController.deleteNotification);

module.exports = router;
