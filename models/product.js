const db = require("../utils/database");

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    async save() {
        if (this.id) {
            const cmd = `UPDATE products 
                SET title='${this.title}', description='${this.description}', price=${this.price}, imageUrl='${this.imageUrl}' 
                where id=${Number(id)}`;
            return db.execute(cmd);
        } else {
            const cmd = `INSERT INTO products(title, description, price, imageUrl) 
                VALUES ('${this.title}', '${this.description}', ${this.price}, '${this.imageUrl}')`;
            return db.execute(cmd);
        }

    }

    static async fetchAll() {
        const [rows, fields] = await db.execute("SELECT * from products");
        return rows;
    }

    static async delete(id) {
        const cmd = `DELETE from products where id=${Number(id)}`;
        console.log(cmd);
        await db.execute(cmd);
    }

    static async getById(id) {
        const [rows, fields] = await db.execute(`SELECT * from products where id=${Number(id)}`);
        return rows.length > 0 ? rows[0] : null;
    }
}