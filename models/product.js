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
                SET title=?, description=?, price=?, imageUrl=?
                where id=${Number(id)}`;
            return db.execute(cmd, [this.title, this.description, this.price, this.imageUrl]);
        } else {
            const cmd = `INSERT INTO products(title, description, price, imageUrl) VALUES (?, ?, ?, ?)`;
            return db.execute(cmd, [this.title, this.description, this.price, this.imageUrl]);
        }

    }

    static async fetchAll() {
        const [rows, fields] = await db.execute("SELECT * from products");
        return rows;
    }

    static async delete(id) {
        const cmd = `DELETE from products where id=${Number(id)}`;
        await db.execute(cmd);
    }

    static async getById(id) {
        const [rows, fields] = await db.execute(`SELECT * from products where id=${Number(id)}`);
        return rows.length > 0 ? rows[0] : null;
    }
}