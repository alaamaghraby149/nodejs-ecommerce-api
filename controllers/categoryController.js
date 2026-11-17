const Category = require('../models/category-model')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/api-error')

// @desc GET list of category
// @routes GET /api/v1/categories
// @access public
exports.getCategories = asyncHandler(async(req, res)=>{
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page -1) * limit
    const categories = await Category.find({}).skip(skip).limit(limit)
    res.status(200).json({results: categories.length, page, data: categories})
})

// @desc GET specific category
// @routes GET /api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const category = await Category.findById(id)
    if(!category){
        // return res.status(404).json({msg: `No category for this ${id}`})
        return next(new ApiError(`No category for this ${id}`, 404))
    }
    res.status(200).json({data: category})
})

// @desc create category
// @routes POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async(req, res, next) => {
    const name = req.body.name
    const category = await Category.create({
        name,
        slug: slugify(name)
        })
        res.status(201).json({data: category})

    
    // .catch(err => res.status(400).send(err))
    
})

// @desc update specific category
// @routes PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const {name} = req.body
    const category = await Category.findOneAndUpdate({_id: id}, {name, slug: slugify(name)}, {new: true})
    if(!category){
        return next(new ApiError(`No category for this ${id}`, 404))
    }
    res.status(200).json({data: category})
})

// @desc delete specific category
// @routes DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    // const {name} = req.body
    const category = await Category.findOneAndDelete({_id: id})
    if(!category){
        return next(new ApiError(`No category for this ${id}`, 404))
    }
    res.status(200).json({data: category})
})
