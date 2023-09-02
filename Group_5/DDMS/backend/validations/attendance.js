const ExpressError = require("../utils/ExpressError");
const { Joi } = require("./joiExtension");

const attend = Joi.object({
  StudentUserId: Joi.number().required(),
  presentee: Joi.boolean().required(),
  SubjectSubCode: Joi.string()
    .trim()
    .required()
    .escapeHTML()
    .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
  createdAt: Joi.date().required(),
}).required();

module.exports.validateUpdateReq = (req, res, next) => {
  const { error } = attend.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const attendMultiple = Joi.array()
  .items(
    Joi.object({
      StudentUserId: Joi.number().required(),
      presentee: Joi.boolean().required(),
      SubjectSubCode: Joi.string()
        .trim()
        .required()
        .escapeHTML()
        .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
      createdAt: Joi.date().required(),
    }).required()
  )
  .required();

module.exports.validateMultiple = (req, res, next) => {
  const { error } = attendMultiple.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const getAttendance = Joi.object({
  filters: Joi.object({
    for: Joi.date().required(),
    subject: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
  }).required(),
});

module.exports.validateSearchReq = (req, res, next) => {
  const { error } = getAttendance.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
