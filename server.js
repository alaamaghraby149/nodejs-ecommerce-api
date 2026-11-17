const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const categoryRoutes = require("./routes/category-route");

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

// Wild card, it's need at least one char after / like(localhost:8000/w)
// app.all('/*path', (req, res, next)=>{
//     // Create error and send it to error handling middleware
// const error = new Error(`Can not find this route: ${req.originalUrl}`)
// next(error.message)
// })

// 404 Handler
app.use((req, res, next) => {
  const error = new Error(`Can not find this route: ${req.originalUrl}`);
  next(error.message);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(404).json({ err });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
