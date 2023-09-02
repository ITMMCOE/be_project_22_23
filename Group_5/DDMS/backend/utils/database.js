const Sequelize = require("sequelize");

let config = {
  db_host: "localhost",
  db_port: 3306,
  db_user: "app",
  db_password: "password",
  db_name: "ddms",
};

if (process.env.NODE_ENV == "production") {
  console.log("PRODUCTION ENVIRONMENT VARIABLES SET");
  config.db_host = process.env.DB_HOST;
  config.db_port = process.env.DB_PORT;
  config.db_user = process.env.DB_USER;
  config.db_password = process.env.DB_PASSWORD;
  config.db_name = process.env.DB_NAME;
}

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_password,
  {
    logging: false,
    host: config.db_host,
    port: config.db_port,
    dialect: "mysql",
  }
);

module.exports = { Sequelize, sequelize };
