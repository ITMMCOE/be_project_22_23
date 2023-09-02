const { UnitTest } = require("../models/unitTest");
const { Student } = require("../models/student");
const { User } = require("../models/user");

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
        await UnitTest.findOrCreate({
          where: {
            StudentUserId: id,
            SubjectSubCode: req.query.SubjectSubCode,
          },
          defaults: {
            StudentUserId: id,
            SubjectSubCode: req.query.SubjectSubCode,
          },
          include: [
            {
              model: Student,
              attributes: ["rollno"],
              order: ["rollno"],
              required: true,
              include: {
                model: User,
                attributes: ["fullname"],
                required: true,
              },
            },
          ],
        })
      )[0]
    );
  }
  res.send({ status: "success", objects: result, err: null });
};

module.exports.update = async (req, res) => {
  const { unitTest } = req.body;
  const result = await UnitTest.update(unitTest, {
    where: {
      SubjectSubCode: unitTest.SubjectSubCode,
      StudentUserId: unitTest.StudentUserId,
    },
  });
  res.send({ status: "success", objects: null, err: null });
};
