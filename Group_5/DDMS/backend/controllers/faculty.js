const { Op } = require("sequelize");
const { Faculty } = require("../models/faculty");
const { Subject } = require("../models/subject");
const { User } = require("../models/user");

module.exports.getClaimedSubjects = async (req, res) => {
  const filter = req.query;
  let facultySubjects;
  if (filter.sem) {
    facultySubjects = await Faculty.findAll({
      where: { userId: req.user.id },
      include: { model: Subject, where: { sem: filter.sem } },
    });
  } else {
    facultySubjects = await Faculty.findAll({
      where: { userId: req.user.id },
      include: ["Subject"],
    });
  }
  res.send({ status: "success", objects: facultySubjects, err: null });
};

module.exports.getUnclaimedSubjects = async (req, res) => {
  const claimedList = await Faculty.findAll({
    where: { userId: req.user.id },
    attributes: ["SubjectSubCode"],
  });
  const subList = claimedList.map((element) => element.SubjectSubCode);
  const result = await Subject.findAll({
    where: { subCode: { [Op.notIn]: subList } },
  });
  res.send({ status: "success", objects: result, err: null });
};

module.exports.claimSubjects = async (req, res) => {
  const { subIds } = req.body;
  const { id } = req.user;
  for (let idx = 0; idx < subIds.length; idx++) {
    let subid = subIds[idx];
    await Faculty.findOrCreate({
      where: { userId: id, SubjectSubCode: subid },
      default: {
        userId: id,
        SubjectSubCode: subid,
      },
    }).catch((err) => {
      console.log(err);
    });
  }
  res.send({ status: "success", objects: null, err: null });
};

module.exports.unclaimSubject = async (req, res) => {
  const { id } = req.user;
  const subcode = req.params.id;
  const exists = await Faculty.findOne({
    where: { userId: id, SubjectSubCode: subcode },
  });
  if (!exists) {
    res.send({
      status: "error",
      objects: null,
      err: `You don't own subject: ${subcode}`,
    });
    return;
  }
  const result = await Faculty.destroy({
    where: { userId: id, SubjectSubCode: subcode },
  });
  if (result === 1) {
    res.send({ status: "success", objects: null, err: null });
  } else res.send({ status: "fail", objects: null, err: "Failed to delete." });
};

module.exports.getAllFaculty = async (req, res) => {
  const faculty = await User.findAll({
    attributes: ["fullname", "role", "email", "id"],
    where: { [Op.or]: [{ role: "faculty" }, { role: "admin" }] },
  });
  res.send({ status: "success", objects: faculty, err: null });
};
