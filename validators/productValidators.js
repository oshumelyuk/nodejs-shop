const {check} = require('express-validator');

module.exports = {
    productModelValidator: [
        check('title')
            .isLength({min: 1, max: 255})
            .withMessage("Product title is required"),
        check('price')
            .isNumeric({min: 0})
            .custom((value, {req}) => {
                if (value <0) {
                    throw new Error('Price should be less or equal to zero');
                }
                return true;
            })
            .withMessage("Product price is required and should be numeric"),
        check('description')
            .isLength({min: 1, max: 1024})
            .withMessage("Description is required and should be less than 1k")
    ]
} 