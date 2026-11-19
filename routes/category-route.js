const express = require('express')
const {param, validationResult} = require('express-validator')
const router = express.Router()
const {getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator} = require('../utils/validator/categoryValidator')
const categoryController = require('../controllers/categoryController')


router.route('/')
    .get(categoryController.getCategories)
    .post(createCategoryValidator, categoryController.createCategory)

router.route('/:id')
    .get(getCategoryValidator, categoryController.getCategory)
    .put(updateCategoryValidator, categoryController.updateCategory)
    .delete(deleteCategoryValidator, categoryController.deleteCategory)

module.exports = router