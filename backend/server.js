const express = require("express");
const app = express();

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const notFound = require("./middleware/errorMiddleware").notFound;
const errorHandler = require("./middleware/errorMiddleware").errorHandler;

app.use(express.json()); //allow us to accept JSON data in body
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
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
//hit this route and fetch the client id of PayPal

//middleware for "Custom Erro handling"
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
