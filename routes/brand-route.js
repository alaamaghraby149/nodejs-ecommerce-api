const express = require('express')
const {param, validationResult} = require('express-validator')
const {getBrandValidator, createBrandValidator, updateBrandValidator, deleteBrandValidator} = require('../utils/validator/brandValidator')
const brandController = require('../controllers/branController')

// mergeParams => allow us to access params on other routers
// we need to access categoryId from category router
const router = express.Router({mergeParams: true})

router.route('/')
    .get(brandController.getBrands)
    .post(createBrandValidator, brandController.createBrand)

router.route('/:id')
    .get(getBrandValidator, brandController.getBrand)
    .put(updateBrandValidator, brandController.updateBrand)
    .delete(deleteBrandValidator, brandController.deleteBrand)

module.exports = router