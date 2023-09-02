const ExpressError = require("../utils/ExpressError");
const { Subject } = require("../models/subject");
const { Joi } = require("./joiExtension");

const utSchema = Joi.object({
  unitTest: Joi.object({
    UT1: Joi.number().integer().max(50).allow(null),
    UT2: Joi.number().integer().max(50).allow(null),
    UT3: Joi.number().integer().max(50).allow(null),
    UT4: Joi.number().integer().max(50).allow(null),
    UT5: Joi.number().integer().max(50).allow(null),
    UT6: Joi.number().integer().max(50).allow(null),
    SubjectSubCode: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
    StudentUserId: Joi.number().required(),
  }).required(),
}).required();

module.exports.validateUTquery = async (req, res, next) => {
  const subject = await Subject.findOne({
    where: { subCode: req.query.SubjectSubCode },
    attributes: ["sem"],
  });
  if (subject.sem == req.query.sem) {
    next();
  } else {
    res.status(400).send({
      status: "error",
      objects: null,
      err: `Subject with code: ${req.query.SubjectSubCode} does not belong to sem: ${req.query.sem}\nInvalid query!`,
    });
  }
};

module.exports.validateUnitTest = (req, res, next) => {
  const { error } = utSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
