const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/api-error')
const ApiFeatures = require('../utils/api-features')

exports.deleteOne = (Model) => 
    asyncHandler(async(req, res, next)=> {
        const {id} = req.params
        // const {name} = req.body
        const document = await Model.findOneAndDelete({_id: id})
        if(!document){
            return next(new ApiError(`No document for this ${id}`, 404))
        }
        res.status(200).json({data: documents})
    })

exports.updateOne = (Model) => 
    asyncHandler(async(req, res, next)=> {
    const document = await Model.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
    )
    if(!document){
        return next(new ApiError(`No document for this ${req.params.id}`, 404))
    }
    res.status(200).json({data: documents})
})

exports.createOne = (Model) => 
    asyncHandler(async(req, res, next) => {
        const document = await Model.create(req.body)
            res.status(201).json({data: documents})
    })

exports.getOne = (Model) =>
        asyncHandler(async(req, res, next)=> {
    const {id} = req.params
    const document = await Model.findById(id)
    if(!document){
        // return res.status(404).json({msg: `No document for this ${id}`})
        return next(new ApiError(`No document for this ${id}`, 404))
    }
    res.status(200).json({data: documents})
})

exports.getAll = (Model, modelName = '') => 
    asyncHandler(async(req, res)=>{
        let filter = {}
        if(req.filterObject) {filter = req.filterObject}
        // Build query
        const documentCounts = await Model.countDocuments()
        const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
                .paginate(documentCounts)
                .filter()
                .search(modelName)
                .limitFields()
                .sort()

        // Execute query
        const {mongooseQuery, paginationResult} = apiFeatures
        const documents = await mongooseQuery
        res.status(200).json({data: documents})
})
