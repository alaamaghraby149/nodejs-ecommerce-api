const Category = require('../models/category-model')
const factory = require('./handlersFactory')

// @desc GET list of category
// @routes GET /api/v1/categories
// @access public
exports.getCategories = factory.getAll(Category)

// @desc GET specific category
// @routes GET /api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category)

// @desc create category
// @routes POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category)


// @desc update specific category
// @routes PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = factory.updateOne(Category)

// @desc delete specific category
// @routes DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.deleteOne(Category)
