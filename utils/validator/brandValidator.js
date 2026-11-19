const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware,
]

exports.createBrandValidator = [
    check('name').notEmpty().withMessage('brand required')
    .isLength({min: 3}).withMessage('Too short brand name')
    .isLength({max: 30}).withMessage('Too long brand name'),
    validatorMiddleware,
]

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware,
]

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware,
]
