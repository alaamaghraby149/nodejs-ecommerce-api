const express = require('express')
const {param, validationResult} = require('express-validator')
const router = express.Router({ mergeParams: true })
const {createSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator, deleteSubcategoryValidator} = require('../utils/validator/subcategoryValidator copy')
const subcategoryController = require('../controllers/subCategoryController')

router.route('/')
    .post(subcategoryController.setCategoryIdToBody, createSubcategoryValidator, subcategoryController.createSubcategory)
    .get(subcategoryController.createFilterObject, subcategoryController.getSubcategories)


router.route('/:id')
    .get(getSubcategoryValidator, subcategoryController.getSubcategory)
    .put(updateSubcategoryValidator, subcategoryController.updateSubcategory)
    .delete(deleteSubcategoryValidator, subcategoryController.deleteSubcategory)
module.exports = router 