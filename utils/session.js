const User = require("../models/user");

module.exports = class Session{
    static getCurrentUser(){
        return User.findByPk(1);
    }
};
