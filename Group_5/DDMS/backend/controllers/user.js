const { User } = require("../models/user");
const { Student } = require("../models/student");
const { Parent } = require("../models/parents");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { sendMail } = require("../utils/email");
const { resetPassword } = require("../models/resetPassword");
const crypto = require("crypto");
const { sequelize, Sequelize } = require("../utils/database");
const Op = Sequelize.Op;

const genPassword = (len = 8) => {
  return uuid.v4().slice(0, len);
};

const register = async (user, password, studentdata) => {
  user.passSalt = bcrypt.genSaltSync(10);
  user.passHash = bcrypt.hashSync(password, user.passSalt);
  const result = await User.create(user);
  if (result.role === "student") {
    const id = result.id;
    if (!studentdata) {
      const student = await Student.create({ userId: id });
      const parent = await Parent.create({ StudentUserId: id });
    } else {
      const student = await Student.create({
        ...studentdata.student,
        userId: id,
      });
      const parent = await Parent.create({
        ...studentdata.parent,
        StudentUserId: id,
      });
    }
  }
  return result;
};

const login = (req, res) => {
  // #swagger.tags = ['user']

  const redirectUrl = req.session.returnTo || "/dashboard";
  delete req.session.returnTo;
  res.send({
    status: "success",
    objects: {
      redirectLink: redirectUrl,
      user: {
        id: req.user.id,
        fullname: req.user.fullname,
        role: req.user.role,
      },
    },
    err: null,
  });
};

const logout = (req, res) => {
  // #swagger.tags = ['user']
  req.logout((err) => {
    if (err) throw err;
  });
  res.send({
    status: "success",
    objects: null,
    err: null,
  });
};

const studentRegister = async (req, res) => {
  // #swagger.tags = ['user']

  const { user } = req.body;
  const prevUser = await User.findOne({
    where: { email: user.email },
    attributes: ["email"],
  });
  if (prevUser) {
    res.send({
      status: "fail",
      objects: null,
      err: `User with email: ${user.email}, already exists.`,
    });
  } else {
    //   let password = genPassword();
    let password = "password";
    if (req.body.student && req.body.parent) {
      await register(user, password, {
        student: { ...req.body.student },
        parent: { ...req.body.parent },
      });
    } else {
      await register(user, password);
    }
    // sendMail(
    //   user.email,
    //   "Account Details",
    //   `Hello ${user.fullname},\n Your password is ${password}, use it to login and fill in the required student details \n Thank You\n NOTE: This is email is generated by DDMS`
    // );
    res.send({ status: "success", objects: null, err: null });
  }
};

const facultyRegister = async (req, res) => {
  const { user } = req.body;
  // let password = genPassword();
  const prevUser = await User.findOne({
    where: { email: user.email },
    attributes: ["email"],
  });
  if (prevUser) {
    res.send({
      status: "fail",
      objects: null,
      err: `User with email: ${user.email}, already exists.`,
    });
  } else {
    let password = "password";
    await register(user, password);
    // sendMail(
    //   user.email,
    //   "Account Details",
    //   `Hello ${user.fullname},\n Your password is ${password}, use it to login and fill in the required details \n Thank You\n NOTE: This is email is generated by DDMS`
    // );
    res.send({ status: "success", objects: null, err: null });
  }
};

const forgotPassword = async function (req, res, next) {
  const user = await User.findOne({
    where: { email: req.body.email },
    attributes: ["email"],
  });

  if (user == null) {
    return res.json({
      status: "fail",
      objects: null,
      err: "No such user found",
    });
  } else {
    const { email } = user;
    await resetPassword.update(
      {
        used: 1,
      },
      {
        where: {
          email: email,
        },
      }
    );
    const randomSalt = crypto.randomBytes(64).toString("base64");
    const expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);
    const { token } = await resetPassword.create({
      email: req.body.email,
      expiration: expireDate,
      token: randomSalt,
      used: 0,
    });
    console.log(token);
    sendMail(
      email,
      "Password Reset",
      "Click this link: http://localhost:3000/reset-password?token=" +
        encodeURIComponent(token) +
        "&email=" +
        req.body.email
    );
    return res.json({
      status: "success",
      objects: { token: token },
      err: null,
    });
  }
};

const reset_password = async function (req, res, next) {
  if (req.body.password1 != req.body.password2) {
    return res.json({
      status: "fail",
      objects: null,
      err: "passwords do not match. please try again",
    });
  }
  const record = await resetPassword.findOne({
    where: {
      email: req.body.email,
      expiration: { [Op.gt]: Sequelize.fn("CURDATE") },
      token: req.body.token,
      used: 0,
    },
  });

  if (record == null) {
    return res.json({
      status: "error",
      objects: null,
      err: "Token not found. Please try again",
    });
  }
  const updaterecord = await resetPassword.update(
    {
      used: 1,
    },
    {
      where: {
        email: req.body.email,
      },
    }
  );

  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;
    bcrypt.hash(req.body.password1, salt, async function (err, hash) {
      if (err) throw err;
      await User.update(
        {
          passHash: hash,
          passSalt: salt,
        },
        {
          where: {
            email: req.body.email,
          },
        }
      );
    });
  });
  res.send({
    status: "success",
    objects: { redirectLink: "/login" },
    err: null,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  if (req.body.hardDelete) {
    await User.destroy({ where: { id: id } });
    res.send({ status: "success", objects: null, err: null });
  } else {
    const user = await User.findByPk(id);
    if (user.role !== "admin") {
      await User.destroy({ paranoid: false, where: { id: id }, force: true });
      res.send({ status: "success", objects: null, err: null });
    } else {
      res.status(403).send({
        status: "failure",
        objects: user,
        err: `${user.fullname} is an admin. Cannot delete admins.`,
      });
    }
  }
};

const getTrashed = async (req, res) => {
  const users = await User.findAll({
    where: {
      deletedAt: {
        [Op.not]: null,
      },
    },
    paranoid: false,
  });
  res.send({ status: "success", objects: users, err: null });
};

const account_information = async (req, res) => {
  if (req.user.role == "student") {
    res.redirect(`/student/${req.user.id}`);
  } else {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "role", "fullname"],
    });
    res.send({ status: "success", objects: user, err: null });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  await User.update({ ...req.body.user }, { where: { id: id } });
  res.send({ status: "success", objects: null, err: null });
};

module.exports = {
  genPassword,
  register,
  login,
  logout,
  studentRegister,
  facultyRegister,
  reset_password,
  forgotPassword,
  editUser,
  deleteUser,
  getTrashed,
  account_information,
};