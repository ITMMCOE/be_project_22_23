const ExpressError = require("../utils/ExpressError");
const { Joi } = require("./joiExtension");

const subjectSchema = Joi.object({
  subject: Joi.object({
    subCode: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" }),
    subName: Joi.string()
      .trim()
      .required()
      .escapeHTML()
      .pattern(/^(?![0-9]*$)[A-z- 0-9]+$/, {
        name: "AlphaNumeric but not only numeric ('-' allowed)",
      }),
    pract: Joi.number().integer(),
    oral: Joi.number().integer(),
    termWork: Joi.number().integer(),
    sem: Joi.number().integer().max(8).required(),
  }),
});

module.exports.validateSubject = (req, res, next) => {
  const { error } = subjectSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
