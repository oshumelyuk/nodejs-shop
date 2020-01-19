const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT,
    sessionSecret: process.env.SESSION_SECRET,
    database: {
        name: process.env.DATABASE,
        login: process.env.DATABASE_LOGIN,
        pwd: process.env.DATABASE_PWD
    }
};