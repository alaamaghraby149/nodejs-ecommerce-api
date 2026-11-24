const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/category-model");
const SubCategory = require("../../models/subcategory-model");

exports.createProductValidator = [
    check("title")
        .notEmpty().withMessage("Product title is required")
        .isLength({ min: 3 }).withMessage("Title must be at least 3 chars")
    .custom((val, {req})=>{
            req.body.slug = slugify(val)
            return true
        }),
    check("description")
        .notEmpty().withMessage("Product description is required")
        .isLength({ max: 2000 }).withMessage("Too long description"),

    check("quantity")
        .notEmpty().withMessage("Product quantity is required")
        .isNumeric().withMessage("Quantity must be a number"),

    check("sold")
        .optional()
        .isNumeric().withMessage("Sold must be a number"),

    check("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),

    check("priceAfterDiscount")
        .optional()
        .isFloat().withMessage("priceAfterDiscount must be a number")
        .toFloat()
        .custom((value, { req }) => {
            if (Number(req.body.price) <= value) {
                throw new Error("priceAfterDiscount must be lower than price");
            }
            return true;
        }),

    check("colors")
        .optional()
        .isArray().withMessage("colors should be array of strings"),

    check("imageCover")
        .notEmpty().withMessage("Product imageCover is required"),

    check("images")
        .optional()
        .isArray().withMessage("images should be array of strings"),

    check("category")
        .notEmpty().withMessage("Product must belong to a category")
        .isMongoId().withMessage("Invalid category id")
        .custom((categoryId) =>
            Category.findById(categoryId).then((category) => {
                if (!category) {
                    return Promise.reject(
                        new Error(`No category for this id: ${categoryId}`),
                    );
                }
            }),
        ),

    check("subcategories")
        .optional()
        .isArray().withMessage("subcategories should be array of ids")
        .custom((subcategoriesIds) =>
            SubCategory.find({ _id: { $in: subcategoriesIds } }).then((result) => {
                if (result.length < 1 || result.length !== subcategoriesIds.length) {
                    return Promise.reject(new Error("Invalid subcategories ids"));
                }
            }),
        )
        .custom((val, { req }) =>
            SubCategory.find({ category: req.body.category }).then((subcategories) => {
                const idsInDB = subcategories.map((s) => s._id.toString());
                const allBelong = val.every((id) => idsInDB.includes(id));
                if (!allBelong) {
                    return Promise.reject(
                        new Error("subcategories do not belong to category"),
                    );
                }
            }),
        ),

    check("subcategories.*")
        .isMongoId().withMessage("Invalid subcategory id"),

    check("brand")
        .optional()
        .isMongoId().withMessage("Invalid brand id"),

    check("ratingsAverage")
        .optional()
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be between 1.0 and 5.0"),

    check("ratingsQuantity")
        .optional()
        .isNumeric().withMessage("ratingsQuantity must be a number"),
    validatorMiddleware,
];

exports.getProductValidator = [
    check("id").isMongoId().withMessage("Invalid ID format"),
    validatorMiddleware,
];

exports.updateProductValidator = [
    check("id").isMongoId().withMessage("Invalid ID format"),
    body("title")
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    body('title').custom((val, {req})=>{
            req.body.slug = slugify(val)
            return true
        }),
    validatorMiddleware,
];

exports.deleteProductValidator = [
    check("id").isMongoId().withMessage("Invalid ID format"),
    validatorMiddleware,
];