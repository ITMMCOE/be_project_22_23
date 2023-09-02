const { sequelize, Sequelize } = require("../utils/database");

const Mark = sequelize.define("Marks", {
  Insem: {
    type: Sequelize.INTEGER,
  },
  Endsem: {
    type: Sequelize.INTEGER,
  },
  TOTAL: {
    type: Sequelize.INTEGER,
  },
  TW: {
    type: Sequelize.INTEGER,
  },
  PR: {
    type: Sequelize.INTEGER,
  },
  OR: {
    type: Sequelize.INTEGER,
  },
  "Tot%": {
    type: Sequelize.INTEGER,
  },
  Crd: {
    type: Sequelize.INTEGER,
  },
  Grd: {
    type: Sequelize.STRING,
  },
  GP: {
    type: Sequelize.INTEGER,
  },
  CP: {
    type: Sequelize.INTEGER,
  },
  "P&R": {
    type: Sequelize.INTEGER,
  },
  ORD: {
    type: Sequelize.INTEGER,
  },
});

module.exports = { Mark };
