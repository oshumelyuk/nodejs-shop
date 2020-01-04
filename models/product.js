const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    async save() {
        const products = await Product.fetchAll();
        products.push({ title: this.title });
        console.log("products ", products);
        fs.writeFile(filePath, JSON.stringify(products));
    }

    static fetchAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                console.log(err, data);
                resolve(err ? [] : JSON.parse(data));
            });
        });
    }
}