const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,

  isFacultyOrAdmin,
} = require("../middleware");
const { validateSubject } = require("../validations/subject");
const subject = require("../controllers/subject");

router
  .route("/create")
  .post(
    isLoggedIn,
    isFacultyOrAdmin,
    validateSubject,
    catchAsync(subject.createSubject)
  );

router
  .route("/all")
  .get(isLoggedIn, isFacultyOrAdmin, catchAsync(subject.getAll));

router
  .route("/:id")
  .get(isLoggedIn, isFacultyOrAdmin, catchAsync(subject.showSubject))
  .put(
    isLoggedIn,
    isFacultyOrAdmin,
    validateSubject,
    catchAsync(subject.updateSubject)
  )
  .delete(isLoggedIn, isFacultyOrAdmin, catchAsync(subject.deleteSubject));
module.exports = router;
