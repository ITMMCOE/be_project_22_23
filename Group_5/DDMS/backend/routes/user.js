const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const user = require("../controllers/user");
const passport = require("passport");
const fs = require("fs");
const { upload } = require("../computationalUnit/fileupload");
const { extractUsers } = require("../computationalUnit/extractExcel");
const {
  validateLoginReq,
  validateUser,
  validateForgetRequest,
  validateResetRequest,
} = require("../validations/user");
const { validateFaculty } = require("../validations/faculty");
const { fileReqValidator } = require("../validations/files");
const {
  validateStudent,

  isLoggedIn,
  isAdmin,
} = require("../middleware");
const path = require("path");

router
  .route("/:id")
  .put(isLoggedIn, validateUser, isAdmin, catchAsync(user.editUser))
  .delete(isLoggedIn, isAdmin, catchAsync(user.deleteUser));

router.route("/login").post(
  validateLoginReq,
  passport.authenticate("local", {
    failureMessage: true,
  }),
  user.login
);

router.route("/trash").get(catchAsync(user.getTrashed));

router.route("/logout").post(isLoggedIn, user.logout);

router.route("/studentRegister").post(
  isLoggedIn,
  //validateStudent,
  catchAsync(user.studentRegister)
);

router
  .route("/facultyRegister")
  .post(isLoggedIn, validateFaculty, catchAsync(user.facultyRegister));

router.route("/download").get(isLoggedIn, isAdmin, (req, res) => {
  res.download(
    path.join(__dirname + "/../public/templates/addUserTemplate.xlsx")
  );
});
router.route("/upload").post(
  isLoggedIn,
  isAdmin,
  upload.single("file"),
  fileReqValidator,
  catchAsync(async (req, res) => {
    const uploadPath = req.file.path;
    const result = await extractUsers(uploadPath);
    fs.unlink(uploadPath, (err) => {
      if (err) next(err);
      return;
    });
    res.send(result);
  })
);

router
  .route("/forgotPassword")
  .post(validateForgetRequest, catchAsync(user.forgotPassword));

router
  .route("/reset-password")
  .post(validateResetRequest, catchAsync(user.reset_password));

router
  .route("/my-account")
  .get(isLoggedIn, catchAsync(user.account_information));

module.exports = router;
