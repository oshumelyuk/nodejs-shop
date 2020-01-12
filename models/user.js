const mongodb = require("mongodb");
const getDb = require("../utils/database").getDB;

module.exports = class User {

    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this.id = id;
    }

    async save() {
        const user = await getDB().collection('users').insertOne(this);
        user.id = user._id;
        return user;
    }

    async addToCart(product) {
        const cartProduct = this.cart.products.find(({productId} ) => productId === product.id);
        if (cartProduct) {
            cartProduct.quantity ++;
        } else  {
            if (!this.cart){
                this.cart = { products: []};
            }
            this.cart.products.push({
                productId: product.id,
                quantity: 1
            });
        }
        getDb().collection("users").updateOne({
            _id: new mongodb.ObjectId(this.id)
        }, {
            $set: { cart: this.cart }
        });
    }

    async removeFromCart(productId) {
        if (!this.cart || !this.cart.products)
            return;

        const cartProductIndex = this.cart.products.findIndex(x => x.productId === productId);
        if (cartProductIndex >= 0) {
            this.cart.products.splice(cartProductIndex, 1);
            getDb().collection("users").updateOne({
                _id: new mongodb.ObjectId(this.id)
            }, {
                $set: { cart: this.cart }
            });
        }
    }

    clearCart(){
        this.cart = {products: []} ;
        return getDb().collection("users").updateOne({
            _id: new mongodb.ObjectId(this.id)
        }, {
            $set: { cart: {products: []} }
        });
    }

    static async getById(id) {
        const user = await getDb().collection('users').findOne(mongodb.ObjectID(id));
        if (user)
            return new User(user.username, user.email, user.cart, user._id);
        return null;
    }
}