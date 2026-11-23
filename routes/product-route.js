const express = require('express')
const {param, validationResult} = require('express-validator')
const {getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator} = require('../utils/validator/productValidator')
const productController = require('../controllers/productController')


const router = express.Router()

router.route('/')
    .get(productController.getProducts)
    .post(createProductValidator, productController.createProduct)


router.route('/:id')
    .get(getProductValidator, productController.getProduct)
    .put(updateProductValidator, productController.updateProduct)
    .delete(deleteProductValidator, productController.deleteProduct)

module.exports = router