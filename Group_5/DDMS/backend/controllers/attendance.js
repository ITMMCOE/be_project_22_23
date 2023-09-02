const { Attendance } = require("../models/attendance");
const { Student } = require("../models/student");
const { User } = require("../models/user");
const { Subject } = require("../models/subject");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../utils/database");

module.exports.readAttendance = async (req, res) => {
  const { filters } = req.body;
  const result = await Attendance.findAll({
    attributes: ["presentee", "createdAt", "StudentUserId", "SubjectSubCode"],
    where: {
      SubjectSubCode: `${filters.subject}`,
      [Op.and]: sequelize.where(
        sequelize.fn("date", sequelize.col("Attendance.createdAt")),
        "=",
        new Date(filters.for).toISOString().slice(0, 10)
      ),
    },
    include: [
      {
        model: Student,
        required: true,
        attributes: ["rollno"],
        order: ["rollno"],
        include: {
          model: User,
          required: true,
          attributes: ["fullname"],
        },
      },
    ],
  });
  res.send({
    status: "success",
    objects: result,
    err: null,
  });
};

module.exports.editAttendance = async (req, res) => {
  await Attendance.update(
    { ...req.body },
    {
      where: {
        StudentUserId: req.body.StudentUserId,
        createdAt: req.body.createdAt,
        SubjectSubCode: req.body.SubjectSubCode,
      },
    }
  )
    .then(() => {
      res.send({ status: "success", objects: null, err: null });
    })
    .catch((err) => {
      res.status(500).send({ status: "fail", objects: null, err: err });
    });
};

module.exports.markMultiple = async (req, res) => {
  const attendList = req.body;
  const result = await Attendance.bulkCreate(attendList);
  res.send({ status: "success", objects: null, err: null });
};

module.exports.studStats = async (req, res) => {
  const user = req.user;
  if (user.role !== "student") {
    res.send({
      status: "fail",
      objects: null,
      err: `${user.id} is not a student`,
    });
  } else {
    const data = {};
    data.totalAvg = await Attendance.findAll({
      attributes: [[Sequelize.literal("AVG(presentee)*100"), "avg"]],
      where: { StudentUserId: user.id },
    });
    data.subwise = await Attendance.findAll({
      attributes: [
        [Sequelize.literal("AVG(presentee)*100"), "avg"],
        "SubjectSubCode",
      ],
      where: { StudentUserId: user.id },
      group: ["SubjectSubCode"],
    });
    res.send({ status: "success", objects: data, err: null });
  }
};

//   Daily count
// Subject wise count
// Weekly count

module.exports.statistics = async (req, res) => {
  const stats = {
    classwise: [],
  };
  stats.deptAvg = await Attendance.findAll({
    attributes: [[Sequelize.literal("AVG(presentee)*100"), "deptAvg"]],
  });
  stats.dailyAvg = await Attendance.findAll({
    attributes: [
      [Sequelize.literal("(AVG(presentee)*100)"), "avg"],
      [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
    ],
    group: ["date"],
    order: [["date"]],
    limit: 5,
  });
  for (let year = 2; year <= 4; year++) {
    stats.classwise.push({
      year: year,
      avg: await Attendance.findAll({
        where: {
          "$Subject.sem$": { [Op.or]: [year * 2, year * 2 - 1] },
          [Op.and]: sequelize.where(
            sequelize.fn("date", sequelize.col("Attendance.createdAt")),
            "=",
            req.query.date
          ),
        },
        include: { model: Subject, attributes: [], required: true },
        attributes: [[Sequelize.literal("AVG(presentee)*100"), "deptAvg"]],
      }),
      subwise: await Attendance.findAll({
        attributes: [
          [Sequelize.literal("AVG(presentee)*100"), "avg"],
          "SubjectSubCode",
        ],
        where: {
          "$Subject.sem$": { [Op.or]: [year * 2, year * 2 - 1] },
          [Op.and]: sequelize.where(
            sequelize.fn("date", sequelize.col("Attendance.createdAt")),
            "=",
            req.query.date
          ),
        },
        include: { model: Subject, attributes: [], required: true },
        group: ["SubjectSubCode"],
      }),
    });
  }

  res.send({ status: "success", objects: stats, err: null });
};
