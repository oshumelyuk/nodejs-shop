const Sequelize = require("sequelize");
const db = require("../utils/database");

const OrderItem = db.define("orderItem", {
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;