const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductModel = new Schema({
  title: String,
  imageUrl: String,
  description: String,
  price: Number
});

module.exports = mongoose.model("Product", ProductModel);