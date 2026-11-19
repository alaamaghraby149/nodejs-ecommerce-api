const Brand = require('../models/brand-model')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/api-error')

// @desc GET list of category
// @routes GET /api/v1/categories
// @access public
exports.getBrands = asyncHandler(async(req, res)=>{
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page -1) * limit
    const brands = await Brand.find({}).skip(skip).limit(limit)
    res.status(200).json({results: brands.length, page, data: brands})
})

exports.getBrand = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const brand = await Brand.findById(id)
    if(!brand){
        // return res.status(404).json({msg: `No brand for this ${id}`})
        return next(new ApiError(`No brand for this ${id}`, 404))
    }
    res.status(200).json({data: brand})
})

exports.createBrand = asyncHandler(async(req, res, next) => {
    const {name} = req.body
    const brand = await Brand.create({
        name,
        slug: slugify(name)
        })
        res.status(201).json({data: brand})
    // .catch(err => res.status(400).send(err))
})

exports.updateBrand = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const {name} = req.body
    const brand = await Brand.findOneAndUpdate({_id: id}, {name, slug: slugify(name)}, {new: true})
    if(!brand){
        return next(new ApiError(`No brand for this ${id}`, 404))
    }
    res.status(200).json({data: brand})
})

exports.deleteBrand = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    // const {name} = req.body
    const brand = await Brand.findOneAndDelete({_id: id})
    if(!brand){
        return next(new ApiError(`No brand for this ${id}`, 404))
    }
    res.status(200).json({data: brand})
})
