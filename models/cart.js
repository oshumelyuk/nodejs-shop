const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static readCart() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                console.log(err, data);
                resolve(err ? {
                    products: [],
                    totalPrice: 0
                } : JSON.parse(data));
            });
        });
    }

    static async addProduct(productId, productPrice) {
        const cart = await Cart.readCart();
        const existingProduct = cart.products
            ? cart.products.find(p => p.id == productId)
            : null;
        const price = parseFloat(productPrice);
        if (existingProduct) {
            existingProduct.qty = existingProduct.qty + 1;
            existingProduct.productPrice = price;
        } else {
            let newProduct = {
                id: productId,
                qty: 1,
                price
            }
            if (cart.products) {
                cart.products.push(newProduct);
            } else {
                cart.products = [newProduct];
            }
        }
        cart.totalPrice = cart.totalPrice + price;
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(cart), () => {
                resolve();
            });
        });
    }
}