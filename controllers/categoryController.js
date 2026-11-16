const CategoryModel = require('../models/category-model')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
exports.getCategories = (req, res)=>{
    // const name = req.body.name
    // console.log(name)
    res.send()
}

exports.createCategory = asyncHandler(async(req, res) => {
    const name = req.body.name
    const category = await CategoryModel.create({
        name,
        slug: slugify(name)
        })
        res.status(201).json({data: category})

    
    // .catch(err => res.status(400).send(err))
    
})
