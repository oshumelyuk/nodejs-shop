const {check} = require('express-validator');

module.exports = {
    productModelValidator: [
        check('title')
            .isAlphanumeric()
            .isLength({min: 1, max: 255})
            .trim()
            .withMessage("Product title is required"),
        check('price')
            .isFloat()
            .custom((value, {req}) => {
                if (value <0) {
                    throw new Error('Price should be less or equal to zero');
                }
                return true;
            })
            .withMessage("Product price is required and should be numeric"),
        check('description')
            .isLength({min: 1, max: 1024})
            .trim()
            .withMessage("Description is required and should be less than 1k")
    ]
} 