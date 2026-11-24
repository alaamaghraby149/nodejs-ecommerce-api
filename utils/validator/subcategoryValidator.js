const {check, body} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const slugify = require('slugify')

exports.getSubcategoryValidator = [
    check('id').isMongoId().withMessage('Invalid subcategory id'),
    validatorMiddleware,
]

exports.createSubcategoryValidator = [
    check('name').notEmpty().withMessage('subcategory required')
    .isLength({min: 3}).withMessage('Too short subcategory name')
    .isLength({max: 30}).withMessage('Too long subcategory name')
    .custom((val, {req})=>{
            req.body.slug = slugify(val)
            return true
        }),
    check('category').notEmpty().withMessage('subcategory must be belong to category').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware,
]

exports.updateSubcategoryValidator = [
    check('id').isMongoId().withMessage('Invalid subcategory id'),
    body('name').custom((val, {req})=>{
            req.body.slug = slugify(val)
            return true
        }),
    validatorMiddleware,
]

exports.deleteSubcategoryValidator = [
    check('id').isMongoId().withMessage('Invalid subcategory id'),
    validatorMiddleware,
]
