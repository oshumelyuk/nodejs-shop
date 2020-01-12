const Sequelize = require("sequelize");
const db = require("../utils/database");

const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        generated: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    description: Sequelize.TEXT,
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});

module.exports = Product;