const mongodb = require("mongodb");
const getDb = require("../utils/database").getDB;
const Product = require("../models/product");

module.exports = class Order{
    constructor(userId, products){
        this.userId = userId;
        this.products = products;
    }

    async save(){
        for(let p of this.products){
            let prod = await Product.getById(p.productId);
            p.price = prod.price;
            p.title = prod.title;
        }
        await getDb().collection("orders").insertOne({
            ...this,
            createdAt: new Date(),
            totalPrice: this.products.reduce((total,curr) => total + curr.quantity * curr.price, 0)
        });
    }

    static async findAll(userId){
        return (await getDb().collection("orders").find({
             userId: mongodb.ObjectID(userId)
        })).toArray();
    }
}