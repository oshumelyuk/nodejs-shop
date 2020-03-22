const {check} = require('express-validator');

module.exports = {
    signupModelValidators: [
        check('email')
            .isEmail()
            .trim()
            .withMessage('Email is not valid email address'),
        check('name')
            .isLength({min: 1, max: 255})
            .trim()
            .withMessage('Name is required'),
        check('password')
            .isLength({ min: 5 })
            .withMessage("Password should be at least 5 chars long"),
        check('confirmPassword')
            .custom((value, {req})=>{
                if (value === req.body.password){
                    throw new Error("Passwords doesn't match");
                }
                return true;
            })
    ],
    loginModelValidators: [
        check('login')
            .isEmail()
            .trim()
            .withMessage('Login si not valid email address'),
    ],
}