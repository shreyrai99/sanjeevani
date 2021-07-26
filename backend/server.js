const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const notFound = require("./middleware/errorMiddleware").notFound;
const errorHandler = require("./middleware/errorMiddleware").errorHandler;
// import express from "express";
// const app = express();
// import dotenv from "dotenv";
// import products from "./data/products.js";

dotenv.config();

connectDB();

// app.get("/", (req, res) => {
//   res.send("API running...");
// });

app.use("/api/products", productRoutes);

//middleware for "Custom Erro handling"
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
