const { sequelize, Sequelize } = require("../utils/database");

const Subject = sequelize.define("Subjects", {
  subCode: {
    type: Sequelize.STRING,
    primaryKey: true,
    validate: {
      is: /^[0-9]+$|^[0-9]+[A-Za-z]$/,
    },
  },
  subName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^(?![0-9]*$)[A-z- 0-9]+$/,
      not: /^[ ]+$/,
    },
  },
  pract: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  oral: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  termWork: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  sem: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = { Subject };
