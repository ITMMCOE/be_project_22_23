const fs = require("fs");
const catchAsync = require("../utils/catchAsync");

const { Mark } = require("../models/mark");
const { Student } = require("../models/student");
const { Subject } = require("../models/subject");
const { User } = require("../models/user");

const {
  spawnProcess,
  cleanResult,
} = require("../computationalUnit/extractPdf");
const { convertToImage } = require("../computationalUnit/pdfToImage");

const ExpressError = require("../utils/ExpressError");

module.exports.getOrCreate = async (req, res) => {
  const students = await Student.findAll({
    where: { curr_sem: req.query.sem },
    attributes: ["userId"],
  });
  const result = [];
  for (let student = 0; student < students.length; student++) {
    let id = students[student].userId;
    result.push(
      (
        await Mark.findOrCreate({
          where: {
            StudentUserId: id,
            SubjectSubCode: req.query.SubjectSubCode,
          },
          defaults: {
            StudentUserId: id,
            SubjectSubCode: req.query.SubjectSubCode,
          },
          include: {
            model: Student,
            required: true,
            attributes: ["rollno", "examseatno"],
            include: {
              model: User,
              required: true,
              attributes: ["fullname"],
            },
          },
        })
      )[0]
    );
  }
  res.send({ status: "success", objects: result, err: null });
};

module.exports.update = async (req, res) => {
  const { mark } = req.body;
  await Mark.update(mark, {
    where: {
      SubjectSubCode: mark.SubjectSubCode,
      StudentUserId: mark.StudentUserId,
    },
  });
  res.send({ status: "success", objects: null, err: null });
};

module.exports.upload = async (req, res) => {
  const filePath = req.file.path;
  const imageProps = await convertToImage(filePath);
  // console.log(JSON.parse(imageProps));
  res.send({
    status: "success",
    objects: {
      filepath: filePath,
      imagePath: `${imageProps.name}`,
      width: imageProps.width,
      height: imageProps.height,
    },
    err: null,
  });
};

module.exports.extract = async (req, res) => {
  const { coords, seatnos, pages, name, image } = req.body;
  if (!fs.existsSync(name) || !fs.existsSync(`public/temp/${image}`)) {
    throw new ExpressError((message = "Files not on Path"), (statusCode = 404));
  }
  const { result, errors } = await cleanResult(
    await spawnProcess(coords, seatnos, pages, name)
  );
  await Mark.bulkCreate(result, {
    updateOnDuplicate: [
      "Insem",
      "Endsem",
      "TOTAL",
      "TW",
      "PR",
      "OR",
      "Tot%",
      "Crd",
      "Grd",
      "GP",
      "CP",
      "P&R",
      "ORD",
    ],
  });
  if (fs.existsSync(name)) {
    fs.unlink(name, (err) => {});
  }
  if (fs.existsSync(`public/temp/${image}`)) {
    fs.unlink(`public/temp/${image}`, (err) => {});
  }

  const report = await Student.findAll({
    attributes: ["examseatno"],
    include: [
      { model: User, attributes: ["fullname"], required: true },
      {
        model: Mark,
        required: true,
        include: { model: Subject, required: true, attributes: ["subName"] },
      },
    ],
  });

  res.send({ status: "success", objects: report, err: errors });
  // res.end();
};
