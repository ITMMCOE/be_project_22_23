const { sequelize, Sequelize } = require("../utils/database");

const Faculty = sequelize.define(
  "Faculties",
  {
    userId: {
      type: Sequelize.INTEGER,
      // primaryKey: true,
    },
  },
  { paranoid: true }
);

// Faculty.removeAttribute("id");

module.exports = { Faculty };
