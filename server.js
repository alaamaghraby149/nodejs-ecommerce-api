const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
dotenv.config({path: 'config.env'})
const dbConnection = require('./config/database')
const categoryRoutes = require('./routes/category-route')
// express app
const app = express()

// connect with db
dbConnection()

// Middleware
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"))
    console.log(`mode: ${process.env.NODE_ENV}`)
}

// routes 
app.use('/api/v1/categories', categoryRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> {
    console.log(`app running on port ${PORT}`)
})