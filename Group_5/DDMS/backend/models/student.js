const { sequelize, Sequelize } = require("../utils/database");

const Student = sequelize.define(
  "Students",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    rollno: {
      type: Sequelize.INTEGER,
      defaultValue: -1,
      allowNull: false,
    },
    examseatno: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    curr_sem: {
      type: Sequelize.INTEGER,
      defaultValue: 3,
      allowNull: false,
    },
    prn: {
      type: Sequelize.STRING,
      defaultValue: "required",
      allowNull: false,
    },
    curryear: {
      type: Sequelize.INTEGER,
      defaultValue: 2,
    },
    parents_mob_no:{
      type: Sequelize.STRING,
      validate: {
        is: /^([+]\d{2})?\d{10}$/
      }
    },
    parents_email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
     },
    
  },
  { paranoid: true }
);

// Student.removeAttribute("id");

module.exports = { Student };
