const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    userName: String,
    userEmail: String,
    products: [{
        productId: String,
        quantity: Number,
        productTitle: String,
        productDescription: String,
        productPrice: Number,
        productImage: String
    }],
    totalPrice: Number,
    createdAt: Date
});

module.exports = mongoose.model("Order", orderSchema);