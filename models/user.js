const db = require("../utils/database");
const Sequelize = require("sequelize");

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        generated: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }, 
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;