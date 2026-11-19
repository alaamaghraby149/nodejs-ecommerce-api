const Subcategory = require('../models/subcategory-model')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/api-error')
exports.setCategoryIdToBody = (req, res, next) => {
    if(!req.body.category) req.body.category = req.params.categoryId
    next()
}
exports.createSubcategory = asyncHandler(async(req, res, next) => {
    const {name, category} = req.body
    const subcategory = await Subcategory.create({
        name,
        slug: slugify(name),
        category
        })
        res.status(201).json({data: subcategory})
    // .catch(err => res.status(400).send(err))
})

exports.createFilterObject = (req, res, next) => {
    let filterObject = {}
    if(req.params.categoryId) filterObject = {category: req.params.categoryId}
    req.filterObject = filterObject
    next()
}

exports.getSubcategories = asyncHandler(async(req, res)=>{
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page -1) * limit

    const subcategories = await Subcategory.find(req.filterObject)
    .skip(skip).limit(limit)
    // .populate({path: 'category', select: 'name -_id)'})
    res.status(200).json({results: subcategories.length, page, data: subcategories})
})

exports.getSubcategory = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const subcategory = await Subcategory.findById(id)
    if(!subcategory){
        // return res.status(404).json({msg: `No category for this ${id}`})
        return next(new ApiError(`No category for this ${id}`, 404))
    }
    res.status(200).json({data: subcategory})
})

exports.updateSubcategory = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const {name, category} = req.body
    const subcategory = await Subcategory.findOneAndUpdate(
        {_id: id}, 
        {name, slug: slugify(name), category}, 
        {new: true})
    if(!subcategory){
        return next(new ApiError(`No subcategory for this ${id}`, 404))
    }
    res.status(200).json({data: subcategory})
})

exports.deleteSubcategory = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    // const {name} = req.body
    const subcategory = await Subcategory.findOneAndDelete({_id: id})
    if(!subcategory){
        return next(new ApiError(`No category for this ${id}`, 404))
    }
    res.status(200).json({data: subcategory})
})

