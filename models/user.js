const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  cart: {
    products: [
      {
        productId: {
          type: "ObjectId",
          ref: "Product",
          required: true
        },
        quantity: Number
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  if (!this.cart) {
    this.cart = { products: [] };
  }
  const cartProduct = this.cart.products.find(
    ({ productId }) => productId.toString() === product.id
  );
  console.log(this.cart.products, product.id);

  if (cartProduct) {
    cartProduct.quantity++;
  } else {
    if (!this.cart) {
      this.cart = { products: [] };
    }
    this.cart.products.push({
      productId: product.id,
      quantity: 1
    });
  }

  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  if (!this.cart || !this.cart.products) return;

  const cartProductIndex = this.cart.products.findIndex(
    x => x.productId.toString() === productId
  );

  if (cartProductIndex >= 0) {
    this.cart.products.splice(cartProductIndex, 1);
    return this.save();
  }
  return Promise.resolve();
};

userSchema.methods.clearCart = function() {
  this.cart = { products: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
