const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin } = require("../middleware");
const { upload } = require("../computationalUnit/fileupload");

const marks = require("../controllers/mark");

const {
  validateCoords,
  validateMarksquery,
  validateMarks,
} = require("../validations/mark");
const { checkFile, fileReqValidator } = require("../validations/files");

router
  .route("/")
  .get(
    isLoggedIn,
    isFacultyOrAdmin,
    validateMarksquery,
    catchAsync(marks.getOrCreate)
  )
  .put(isLoggedIn, isFacultyOrAdmin, validateMarks, catchAsync(marks.update));

router
  .route("/upload")
  .post(
    isLoggedIn,
    isFacultyOrAdmin,
    upload.single("file"),
    fileReqValidator,
    checkFile,
    catchAsync(marks.upload)
  );

router
  .route("/cropCoordinates")
  .post(
    isLoggedIn,
    isFacultyOrAdmin,
    validateCoords,
    catchAsync(marks.extract)
  );

module.exports = router;
