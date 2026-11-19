const express = require('express')
const {param, validationResult} = require('express-validator')
const router = express.Router()
const {createSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator, deleteSubcategoryValidator} = require('../utils/validator/subcategoryValidator copy')
const subcategoryController = require('../controllers/subCategoryController')

router.route('/')
    .post(createSubcategoryValidator, subcategoryController.createSubcategory)
    .get(subcategoryController.getSubcategories)


router.route('/:id')
    .get(getSubcategoryValidator, subcategoryController.getSubcategory)
    .put(updateSubcategoryValidator, subcategoryController.updateSubcategory)
    .delete(deleteSubcategoryValidator, subcategoryController.deleteSubcategory)
module.exports = router 