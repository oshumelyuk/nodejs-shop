const db = require("../utils/database");
const Sequelize = require("sequelize");

module.exports = db.define("order", {
    id: {
        type: Sequelize.INTEGER,
        generated: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalPrice: Sequelize.DECIMAL
});
