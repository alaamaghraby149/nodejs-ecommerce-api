const ApiError = require('../utils/api-error')

const handleCastError = (err) =>
    new ApiError(`Invalid ${err.path}: ${err.value}`, 400)

const globalError = (err, req, res, next) => {
    if (err.name === 'CastError') err = handleCastError(err)

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    
    if(process.env.NODE_ENV === 'development'){
        sendErrorForDev(err, res)
    }else{
        sendErrorForProduction(err, res)
    }
}

const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({ 
        status: err.status, 
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorForProduction = (err, res) => {
    return res.status(err.statusCode).json({ 
        status: err.status, 
        message: err.message,
    });
}
module.exports = globalError