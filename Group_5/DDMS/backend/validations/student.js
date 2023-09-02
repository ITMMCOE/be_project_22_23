const ExpressError = require("../utils/ExpressError");
const { Joi } = require("./joiExtension");

const studentRegister = Joi.object({
  user: Joi.object({
    fullname: Joi.string().trim().required().escapeHTML(),
    // .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
    //   name: "firstname<space>lastname [Alphabets Only]",
    // }),
    email: Joi.string().trim().lowercase().email().required().escapeHTML(),
    role: Joi.string()
      .trim()
      .lowercase()
      .valid("student")
      .required()
      .escapeHTML(),
  }).required(),
}).required();

module.exports.validateStudent = (req, res, next) => {
  const { error } = studentRegister.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const studentSchema = Joi.object({
  student: Joi.object({
    rollno: Joi.number().integer().required(),
    curr_sem: Joi.number().integer().max(8).required(),
    curryear: Joi.number().integer().max(5).required(),
    examseatno: Joi.string().escapeHTML().allow(null),
    prn: Joi.string().escapeHTML(),
    parents_mob_no: Joi.number(),
    parents_email: Joi.string().trim().lowercase().email().escapeHTML(),
  }),
});

module.exports.validateStudentProfile = async (req, res, next) => {
  console.log(req.body);
  const { error } = studentSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  }
};
