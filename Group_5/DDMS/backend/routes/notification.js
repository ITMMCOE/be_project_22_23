// routes/sms.js
const express = require("express");
const router = express.Router();
const { sendSMSToStudent } = require("../controllers/notification");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const { validateSmsReq } = require("../validations/notification");
router.post(
  "/sms",
  isLoggedIn,
  isFacultyOrAdmin,
  validateSmsReq,
  sendSMSToStudent
);

module.exports = router;
