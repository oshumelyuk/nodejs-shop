const mongodb = require("mongodb");
const getDb = require("../utils/database").getDB;

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    const db = getDb();
    if (this.id) {
      await db.collection("products").updateOne(
        { _id: new mongodb.ObjectId(id) },
        {
          $set: {
            title: this.title,
            description: this.description,
            price: this.price,
            imageUrl: this.imageUrl
          },
          $currentDate: { lastModified: true }
        }
      );
    } else {
      await db.collection("products").insertOne({
        title: this.title,
        description: this.description,
        price: this.price,
        imageUrl: this.imageUrl
      });
    }
  }

  static async fetchAll() {
    const db = getDb();
    const products = await db.collection("products").find({}).toArray();
    products.forEach(p => {
      if (p)
        p.id = p._id;
    });
    return products; 
  }

  static async delete(id) {
    const db = getDb();
    await db.collection("products").deleteOne({
      _id: new mongodb.ObjectId(id)
    });
  }

  static async getById(id) {
    const db = getDb();
    const product = await db.collection("products").findOne(new mongodb.ObjectId(id));
    if (product){
      product.id = product._id;
    }
    return product;
  }
};
