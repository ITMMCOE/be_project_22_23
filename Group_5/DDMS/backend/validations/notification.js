const ExpressError = require("../utils/ExpressError");
const { Joi } = require("./joiExtension");

const smsRequest = Joi.object({
  phoneNumber: Joi.string()
    .escapeHTML()
    .pattern(/^\+91[1-9]\d{9}$/, { name: "+91xxxxxxxxxx" })
    .required(),
  message: Joi.string().required().escapeHTML(),
});

module.exports.validateSmsReq = (req, res, next) => {
  const { error } = smsRequest.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
