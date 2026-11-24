const Product = require('../models/product-model')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/api-error')
const Category = require('../models/category-model')

exports.getProducts = asyncHandler(async(req, res)=>{
    // Filtering
    const queryStringObject = {...req.query}
    const excludesFields = ['page', 'sort', 'limit', 'fields']
    excludesFields.forEach((field)=> delete queryStringObject[field])

    // Pagination
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 50
    const skip = (page -1) * limit

    // Apply filtration using [gte, gt, lte, lt]
    let queryString = JSON.stringify(queryStringObject)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)

    // Build query
    const mongooseQuery = Product.find(JSON.parse(queryString))
        // .where('price').equals(req.query.price)
        // .where('ratingsAverage').equals(req.query.ratingsAverage)
            .skip(skip)
            .limit(limit).populate({path:"category", select: 'name' })
    
    // Execute query
    const products = await mongooseQuery
    res.status(200).json({results: products.length, page, data: products})
})

exports.getProduct = asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const product = await Product.findById(id).populate({path:"category", select: 'name' })
    if(!product){
        // return res.status(404).json({msg: `No product for this ${id}`})
        return next(new ApiError(`No product for this ${id}`, 404))
    }
    res.status(200).json({data: product})
})

exports.createProduct = asyncHandler(async(req, res, next) => {
    req.body.slug = slugify(req.body.title)
    // const category = Category.findById(req.body.category)
    const product = await Product.create(req.body)
        res.status(201).json({data: product})
    // .catch(err => res.status(400).send(err))
})

exports.updateProduct = asyncHandler(async(req, res, next)=> {
    const { id } = req.params
    if(req.body.title){
        req.body.slug = slugify(req.body.title)
    }
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
