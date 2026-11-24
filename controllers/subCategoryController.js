const Subcategory = require('../models/subcategory-model')
const factory = require('./handlersFactory')

exports.setCategoryIdToBody = (req, res, next) => {
    if(!req.body.category) req.body.category = req.params.categoryId
    next()
}
exports.createSubcategory = factory.createOne(Subcategory)

exports.createFilterObject = (req, res, next) => {
    let filterObject = {}
    if(req.params.categoryId) filterObject = {category: req.params.categoryId}
    req.filterObject = filterObject
    next()
}

exports.getSubcategories = factory.getAll(Subcategory)

exports.getSubcategory = factory.getOne(Subcategory)

exports.updateSubcategory = factory.updateOne(Subcategory)


exports.deleteSubcategory = factory.deleteOne(Subcategory)


