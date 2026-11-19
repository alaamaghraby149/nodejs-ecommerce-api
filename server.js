const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "config.env" });
const errorMiddleware = require('./middlewares/errorMiddileware')
const ApiError = require('./utils/api-error')
const dbConnection = require("./config/database");
const categoryRoutes = require("./routes/category-route");
const subcategoryRoutes = require('./routes/subcategory')
const brandRoutes = require('./routes/brand-route')
// express app
const app = express();

// connect with db
dbConnection();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes
app.get("/", (req, res, next) => {
  res.json({
    status: "true",
    message: "Welcome To Node.Js App",
  });
});

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/subcategories", subcategoryRoutes);
app.use("/api/v1/brands", brandRoutes);
// Wild card, it's need at least one char after / like(localhost:8000/w)
// app.all('/*path', (req, res, next)=>{
//     // Create error and send it to error handling middleware
// const error = new Error(`Can not find this route: ${req.originalUrl}`)
// next(error.message)
// })

// 404 Handler
app.use((req, res, next) => {
//   const error = new Error(`Can not find this route: ${req.originalUrl}`);
//   next(error.message);
    next(new ApiError(`Can not find this route: ${req.originalUrl}`, 400))
});

// Global error handling middleware for express
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});

// Handle rejections outside express 
process.on('unhandledRejection', (err)=> {
    console.error(`unhandledRejection errors: ${err.name} | ${err.message}`)
    server.close(()=> {
        console.error(`Shut down...`)
        process.exit(1) 
    })
})