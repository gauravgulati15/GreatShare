const express = require('express');
const VerifyController = require("../Controllers/verifyController");

const router = express.Router();

router.route("/sendPhoneCode").put(VerifyController.sendVerificationCode);
router.route("/verifyPhoneCode").put(VerifyController.verifyVerificationCode);
router.route("/sendEmailCode").put(VerifyController.sendEmailVerificationCode);
router.route("/verifyEmailCode").put(VerifyController.verifyEmailVerificationCode);

// router.route("/allEmails").get(VerifyController.getAllEmails);

module.exports = router;
