const { sequelize, Sequelize } = require("../utils/database");

const User = sequelize.define(
  "Users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["student", "admin", "faculty"]],
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        // is: /^[a-zA-Z]+\s[a-zA-Z]+$/,
      },
    },
    passHash: {
      type: Sequelize.STRING,
    },
    passSalt: {
      type: Sequelize.STRING,
    },
  },
  {
    paranoid: true,
    hooks: {
      afterDestroy: function (instance, options) {
        instance.getStudent().then((student) => student.destroy());
        instance.getFaculty().then((faculty) => faculty.destroy());
      },
      afterRestore: function (instance, options) {
        instance
          .getStudent({ paranoid: false })
          .then((student) => student.restore());
        instance
          .getFaculty({ paranoid: false })
          .then((faculty) => faculty.restore());
      },
    },
  }
);

module.exports = { User };
