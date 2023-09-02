const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const {
  validateMultiple,
  validateSearchReq,
  validateUpdateReq,
} = require("../validations/attendance");
const attendance = require("../controllers/attendance");

router
  .route("/multiple")
  .post(
    isLoggedIn,
    isFacultyOrAdmin,
    validateMultiple,
    catchAsync(attendance.markMultiple)
  );

router
  .route("/")
  .post(
    isLoggedIn,
    isFacultyOrAdmin,
    validateSearchReq,
    catchAsync(attendance.readAttendance)
  )
  .put(
    isLoggedIn,
    isFacultyOrAdmin,
    validateUpdateReq,
    catchAsync(attendance.editAttendance)
  );

router
  .route("/stats")
  .post(isLoggedIn, isFacultyOrAdmin, catchAsync(attendance.statistics));
router.route("/stud-stats").get(isLoggedIn, catchAsync(attendance.studStats));

module.exports = router;
