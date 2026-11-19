const express = require('express')
const {param, validationResult} = require('express-validator')
const {getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator} = require('../utils/validator/categoryValidator')
const categoryController = require('../controllers/categoryController')
const subcategoriesRoute = require('./subcategory')

// mergeParams => allow us to access params on other routers
// we need to access categoryId from category router
const router = express.Router({mergeParams: true})

router.route('/')
    .get(categoryController.getCategories)
    .post(createCategoryValidator, categoryController.createCategory)

router.use('/:categoryId/subcategories', subcategoriesRoute)

router.route('/:id')
    .get(getCategoryValidator, categoryController.getCategory)
    .put(updateCategoryValidator, categoryController.updateCategory)
    .delete(deleteCategoryValidator, categoryController.deleteCategory)

module.exports = router