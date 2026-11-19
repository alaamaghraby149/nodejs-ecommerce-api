const mongoose = require('mongoose')

// 1-create schema
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand required'],
        unique: true,
        trim: true,
        minlength: [3, 'Too short brand name'],
        maxlength: [30, 'Too long brand name'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, {timestamps: true})


const BrandModel = mongoose.model("brand", BrandSchema)

module.exports = BrandModel