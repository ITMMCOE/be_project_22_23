const ExpressError = require("../utils/ExpressError");
const { Joi } = require("./joiExtension");

const facultyRegister = Joi.object({
  user: Joi.object({
    fullname: Joi.string().trim().required().escapeHTML(),
    // .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
    //   name: "firstname<space>lastname [Alphabets Only]",
    // }),
    email: Joi.string().trim().lowercase().email().required().escapeHTML(),
    role: Joi.string()
      .trim()
      .lowercase()
      .valid("faculty")
      .required()
      .escapeHTML(),
  }).required(),
}).required();

module.exports.validateFaculty = (req, res, next) => {
  const { error } = facultyRegister.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const claimSchema = Joi.object({
  subIds: Joi.array()
    .items(
      Joi.string()
        .trim()
        .required()
        .escapeHTML()
        .pattern(/^[0-9]+$|^[0-9]+[A-Za-z]$/, { name: "subject code" })
        .required()
    )
    .required(),
});

module.exports.validateClaimReq = (req, res, next) => {
  const { error } = claimSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
