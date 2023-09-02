const { sequelize, Sequelize } = require("../utils/database");

const UnitTest = sequelize.define("UnitTests", {
  UT1: {
    type: Sequelize.INTEGER,
    validate: {
      max: 50,
    },
  },
  UT2: {
    type: Sequelize.INTEGER,
    validate: {
      max: 50,
    },
  },
  UT3: {
    type: Sequelize.INTEGER,
    validate: {
      max: 50,
    },
  },
  UT4: {
    type: Sequelize.INTEGER,
    validate: {
      max: 50,
    },
  },
  UT5: {
    type: Sequelize.INTEGER,
    validate: {
      max: 50,
    },
  },
  UT6: {
    type: Sequelize.INTEGER,
    validate: {
      max: 50,
    },
  },
});

module.exports = { UnitTest };
