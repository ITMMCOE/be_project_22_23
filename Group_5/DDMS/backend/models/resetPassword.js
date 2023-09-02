const {sequelize, Sequelize} = require("../utils/database");

const resetPassword = sequelize.define("resetPasswords", {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
    },
    expiration: {
        type: Sequelize.TIME,
    },
    used: {
        type: Sequelize.INTEGER
    },
})

module.exports = {resetPassword}