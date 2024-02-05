const Sequelize = require("sequelize");
const connection = require("../configs/database.config.js");

const sequelizeDb = new Sequelize(connection.database, connection.username, connection.password, {
  host: connection.host,
  dialect: connection.dialect,
});

module.exports = sequelizeDb;
