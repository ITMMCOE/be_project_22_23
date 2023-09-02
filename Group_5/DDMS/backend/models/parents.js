const { sequelize, Sequelize } = require("../utils/database");

const Parent = sequelize.define("Parents", {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING,
  },
});

module.exports = { Parent };
