const Product = require('../models/product-model')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/api-error')

exports.getProducts = asyncHandler(async(req, res)=>{
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page -1) * limit
    const products = await Product.find({}).skip(skip).limit(limit)
    res.status(200).json({results: products.length, page, data: products})
})

exports.getProduct = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product){
        // return res.status(404).json({msg: `No product for this ${id}`})
        return next(new ApiError(`No product for this ${id}`, 404))
    }
    res.status(200).json({data: product})
})

exports.createProduct = asyncHandler(async(req, res, next) => {
    req.body.slug = slugify(req.body.title)
    const product = await Product.create(req.body)
        res.status(201).json({data: product})
    // .catch(err => res.status(400).send(err))
})

exports.updateProduct = asyncHandler(async(req, res, next)=> {
    req.body.slug = slugify(req.body.title)
    const product = await Product.findOneAndUpdate({_id: id}, req.body, {new: true})
    if(!product){
        return next(new ApiError(`No product for this ${id}`, 404))
    }
    res.status(200).json({data: product})
})

exports.deleteProduct = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    // const {name} = req.body
    const product = await Product.findOneAndDelete({_id: id})
    if(!product){
        return next(new ApiError(`No product for this ${id}`, 404))
    }
    res.status(200).json({data: product})
})
