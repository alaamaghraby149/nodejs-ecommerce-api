const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        minLength: [3, 'Too short product title'],
        maxLength: [150, 'Too long product title']
    },
    slug: {
        type: String, 
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        minLength: [40, 'Too short product title'],
    },
    quantity: {
        type: String,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    }, 
    price: {
        type: Number,
        required: true,
        trim: true,
        max: [200000000000, 'Too long price for product']
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    imageCover: {
        type: String, 
        required: true
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    }],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand'
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1'],
        max: [5, 'Rating must be below or equal 5']
    },
    RatingsQuantity: {
        type: Number, 
        default: 0
    }
},{timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)
