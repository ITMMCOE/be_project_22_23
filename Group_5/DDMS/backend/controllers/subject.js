const { Subject } = require("../models/subject");

module.exports.createSubject = async (req, res) => {
  const { subject } = req.body;
  const prevSubject = await Subject.findOne({
    where: { subCode: subject.subCode },
    attrubutes: ["subcode"],
  });
  if (prevSubject) {
    res.send({
      status: "error",
      objects: null,
      err: `Subject with subject code: ${subject.subCode}, already exists`,
    });
  } else {
    await Subject.create(subject)
      .then((result) => {
        res.redirect(`/subjects/${subject.subCode}`);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

module.exports.showSubject = async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findOne({ where: { subCode: id } });
  if (!subject) {
    res.send({
      status: "error",
      objects: null,
      err: `subject:${id} doesn't exists`,
    });
  } else {
    res.send({ status: "success", objects: subject, err: null });
  }
};

module.exports.updateSubject = async (req, res) => {
  const { id } = req.params;
  await Subject.update({ ...req.body.subject }, { where: { subCode: id } })
    .then((result) => {
      res.send({ status: "success", objects: null, err: null });
    })
    .catch((err) => {
      res.status(500).send({ status: "error", objects: null, err: err });
    });
};

module.exports.deleteSubject = async (req, res) => {
  const { id } = req.params;
  const exists = await Subject.findOne({ where: { subCode: id } });
  if (!exists) {
    res.send({
      status: "error",
      objects: null,
      err: `subject:${id} doesn't exists`,
    });
    return;
  }
  const result = await Subject.destroy({
    where: {
      subCode: id,
    },
  });
  if (result === 1) res.send({ status: "success", objects: null, err: null });
  else
    res
      .status(500)
      .send({ status: "error", objects: null, err: "Something went wrong" });
};

module.exports.getAll = async (req, res) => {
  const filter = req.query;
  let subjects;
  if (filter.sem) {
    subjects = await Subject.findAll({ where: { sem: filter.sem } });
  } else {
    subjects = await Subject.findAll();
  }
  res.send({ status: "success", objects: subjects, err: null });
};
