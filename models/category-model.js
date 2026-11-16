const mongoose = require('mongoose')

// 1-create schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        unique: true,
        trim: true,
        minlength: [3, 'Too short category name'],
        maxlength: [30, 'Too long category name'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, {timestamps: true})

// 1-create model
const CategoryModel = mongoose.model("category", CategorySchema)

module.exports = CategoryModel