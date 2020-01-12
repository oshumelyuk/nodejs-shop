const CartItem = require("./cartItem");
const Product = require("./product");

module.exports = class Cart {
    static async readCart(userId) {
        const cartItems = await CartItem.findAll({
            where: {
                userId: userId
            }
        });
        const cart = {
            products: [],
            totalPrice: 0
        }
        if (cartItems) {
            for (var p of cartItems) {
                let productInfo = await Product.findByPk(p.productId);
                cart.products.push({
                    productId: p.productId,
                    qty: p.quantity,
                    info: { title: productInfo.title, price: productInfo.price, id: productInfo.id }
                })
                cart.totalPrice += productInfo.price * p.quantity;
            }
        }
        return cart;
    }

    static async addProduct(userId, productId, productPrice) {
        const existingProduct = await CartItem.findOne({
            where: {
                userId: userId,
                productId: productId
            }
        });
        if (existingProduct) {
            await CartItem.update({
                quantity: existingProduct.quantity + 1
            }, {
                where: {
                    id: existingProduct.id
                }
            });
        } else {
            await CartItem.create({
                userId,
                productId,
                quantity: 1
            });
        }
    }

    static async removeProduct(userId, productId) {
        const existingProduct = await CartItem.findOne({
            where: {
                userId: userId,
                productId: productId
            }
        });
        if (existingProduct) {
            existingProduct.destroy();
        }
    }

    static async destroyCart(userId){
        const cartItems = await CartItem.findAll({
            where: {
                userId: userId
            }
        });
        if (cartItems){
            cartItems.forEach(ci => ci.destroy());
        }
    }
};