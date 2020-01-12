const Sequelize = require("sequelize");
const db = require("../utils/database");

const CartItem = db.define("cartItem", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: Sequelize.INTEGER,
});

module.exports = CartItem;