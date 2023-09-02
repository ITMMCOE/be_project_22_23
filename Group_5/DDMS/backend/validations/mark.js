const { Joi } = require("./joiExtension");
const ExpressError = require("../utils/ExpressError");
const { Subject } = require("../models/subject");
const cropCoordinates = Joi.object({
  coords: Joi.array()
    .items(Joi.array().items(Joi.number()).min(4).max(4).required())
    .min(1)
    .required(),
  seatnos: Joi.array()
    .items(Joi.array().items(Joi.number()).min(4).max(4).required())
    .min(1)
    .required(),
  pages: Joi.number().min(1).required(),
  name: Joi.string()
    .pattern(
      /^public\/uploads\/[a-zA-Z0-9]+[^!@#$%^&*(),.?":{}|<>~`'\\\/]+\.pdf$/,
      { name: "Upload path" }
    )
    .escapeHTML()
    .required(),
  image: Joi.string()
    .pattern(/^\d+.jpeg$/, { name: "Image path" })
    .escapeHTML()
    .required(),
}).required();

module.exports.validateCoords = (req, res, next) => {
  const { error } = cropCoordinates.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateMarksquery = async (req, res, next) => {
  const subject = await Subject.findOne({
    where: { subCode: req.query.SubjectSubCode },
    attributes: ["sem"],
  });
  console.log(req.query)
  if (subject && subject.sem == req.query.sem) {
    next();
  } else {
    res.status(400).send({
      status: "error",
      objects: null,
      err: `Subject with code: ${req.query.SubjectSubCode} does not belong to sem: ${req.query.sem}\nInvalid query!`,
    });
  }
};

const updateMarkSchema = Joi.object({
  mark: Joi.object({
    Insem: Joi.number().integer().min(0).max(30).allow(null),
    Endsem: Joi.number().integer().min(0).max(70).allow(null),
    TOTAL: Joi.number().integer().min(0).max(100).allow(null),
    TW: Joi.number().integer().min(0).max(100).allow(null),
    PR: Joi.number().integer().min(0).max(100).allow(null),
    OR: Joi.number().integer().min(0).max(100).allow(null),
    "Tot%": Joi.number().integer().min(0).max(100).allow(null),
    Crd: Joi.number().integer().min(0).max(30).allow(null),
    Grd: Joi.string().trim().escapeHTML().allow(null),
    GP: Joi.number().integer().min(0).max(30).allow(null),
    CP: Joi.number().integer().min(0).max(30).allow(null),
    "P&R": Joi.number().integer().min(0).max(30).allow(null),
    ORD: Joi.number().integer().min(0).max(30).allow(null),
    SubjectSubCode: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
    StudentUserId: Joi.number().required(),
  }).required(),
}).required();

module.exports.validateMarks = (req, res, next) => {
  const { error } = updateMarkSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
