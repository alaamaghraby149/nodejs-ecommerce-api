const mongoose = require('mongoose')

// 1-create schema
const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        minlength: [2, 'Too short category name'],
        maxlength: [30, 'Too long category name'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model("Subcategory", SubcategorySchema)