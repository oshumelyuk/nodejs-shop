const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    async save() {
        let products = await Product.fetchAll();
        const maxId = products.length > 0 ? Math.max( products.map(x => x.id)) : 0;
        products = products.filter(function(item) {
            return item.id != id;
        });
        products.push({ 
            title: this.title,
            description: this.description,
            price: this.price,
            imageUrl: this.imageUrl,
            id: this.id || (maxId + 1)
        });
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(products), () => {
                resolve();
            });
        });

    }

    static fetchAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                console.log(err, data);
                resolve(err ? [] : JSON.parse(data));
            });
        });
    }

    static async delete(id){
        let products = await Product.fetchAll();
        products = products.filter(function(item) {
            return item.id != id;
        });
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(products), () => {
                resolve();
            });
        });
    }

    static async getById(id){
        let products = await Product.fetchAll();
        return products.find(x => x.id == id);
    }
}