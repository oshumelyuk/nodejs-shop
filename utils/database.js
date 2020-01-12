const Sequelize = require("sequelize");
const db = new Sequelize('node_shop', 'root', 'root123!', {dialect: 'mysql', host: 'localhost'});

module.exports = db;