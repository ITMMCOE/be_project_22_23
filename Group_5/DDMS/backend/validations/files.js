const { Joi } = require("./joiExtension");
const ExpressError = require("../utils/ExpressError");
const fs = require("fs");
module.exports.checkFile = (req, res, next) => {
  if (req.file && !fs.existsSync(req.file.path)) {
    throw new ExpressError("InCorrect file path in request", 400);
  } else {
    next();
  }
};

module.exports.fileReqValidator = (req, res, next) => {
  if (!req.file) {
    throw new ExpressError("The request must contain a file", 400);
  } else {
    next();
  }
};
