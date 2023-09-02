const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  isFacultyOrAdmin,
  validateUser,
  validateStudentProfile,
} = require("../middleware");
const student = require("../controllers/student");
const { upload } = require("../computationalUnit/fileupload");
const { extract_seatno } = require("../computationalUnit/seatnoMapping");
const fs = require("fs");
const { Student } = require("../models/student");
const { User } = require("../models/user");
const { Op } = require("sequelize");
const { fileReqValidator } = require("../validations/files");

router
  .route("/search")
  .get(isLoggedIn, isFacultyOrAdmin, catchAsync(student.search));

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(student.getProfileData))
  .put(isLoggedIn, catchAsync(student.updateProfileData))
  .delete(isLoggedIn, isFacultyOrAdmin, catchAsync(student.deleteStudent));

router.route("/mapSeatnos").post(
  upload.single("file"),
  fileReqValidator,
  catchAsync(async (req, res) => {
    const errors = [];
    const response = [];
    const result = await extract_seatno(req.file.path);
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        let user = await User.findOne({
          where: {
            fullname: {
              [Op.substring]: result[i][j].fullname.split(" ")[0],
            },
          },
          attributes: ["id"],
        });
        if (user) {
          await Student.update(
            { examseatno: result[i][j].examseatno },
            {
              where: { [Op.or]: { userId: user.id, prn: result[i][j].prn } },
            }
          );
          response.push(
            await Student.findOne({
              where: {
                [Op.or]: { userId: user.id, prn: result[i][j].prn },
                examseatno: result[i][j].examseatno,
              },
              include: {
                model: User,
                required: true,
                attributes: ["fullname"],
              },
              attributes: ["rollno", "examseatno"],
            })
          );
        } else {
          result[i][j].errmsg = "Couldn't Find or Map the Student";
          errors.push(result[i][j]);
        }
      }
    }
    fs.unlink(req.file.path, (error) => {
      if (error) throw error;
    });
    if (errors.length > 0) {
      res.send({ status: "failed", objects: response, err: errors });
    } else {
      res.send({ status: "success", objects: response, err: errors });
    }
  })
);

module.exports = router;
