const {param, validationResult} = require('express-validator')
// @desc middleware catch the error before it goes to controller if it exist in rules
const validatorMiddleware = 
    (req, res, next) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next()
    }

module.exports = validatorMiddleware