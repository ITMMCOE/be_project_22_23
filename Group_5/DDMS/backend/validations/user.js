const ExpressError = require("../utils/ExpressError");
const { Joi } = require("./joiExtension");

module.exports.userUploadSchema = Joi.object({
  fullname: Joi.string().trim().required().escapeHTML(),
  // .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
  //   name: "firstname<space>lastname [Alphabets Only]",
  // }),
  email: Joi.string().trim().lowercase().email().required().escapeHTML(),
  role: Joi.string()
    .trim()
    .valid("student", "admin", "faculty")
    .required()
    .escapeHTML(),
}).required();

const forgotpassword = Joi.object({
  email: Joi.string().trim().lowercase().required().email().escapeHTML(),
});

module.exports.validateForgetRequest = (req, res, next) => {
  console.log(req.body);
  const { error } = forgotpassword.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const resetpassword = Joi.object({
  email: Joi.string().trim().lowercase().required().email().escapeHTML(),
  token: Joi.string().trim().lowercase().required().escapeHTML(),
  password1: Joi.string().trim().lowercase().required().escapeHTML(),
  password2: Joi.string().trim().lowercase().required().escapeHTML(),
});

module.exports.validateResetRequest = (req, res, next) => {
  const { error } = resetpassword.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const userSchema = Joi.object({
  user: Joi.object({
    fullname: Joi.string().trim().required().escapeHTML(),
    // .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
    //   name: "firstname<space>lastname [Alphabets Only]",
    // }),
    email: Joi.string().trim().lowercase().email().required().escapeHTML(),
    role: Joi.string()
      .trim()
      .lowercase()
      .valid("faculty", "student", "admin")
      .required()
      .escapeHTML(),
  }).required(),
}).required();

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
    // res.status(400).send({
    //   status: "error",
    //   objects: null,
    //   err: msg
    // })
  } else {
    next();
  }
};

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().escapeHTML(),
  password: Joi.string().trim().lowercase().required().escapeHTML(),
});

module.exports.validateLoginReq = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
