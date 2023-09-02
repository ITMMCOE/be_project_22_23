const { sequelize, Sequelize } = require("../utils/database");

const Attendance = sequelize.define("Attendance", {
  presentee: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

Attendance.removeAttribute("id");

module.exports = { Attendance };
