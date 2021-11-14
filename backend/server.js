const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const postRoutes = require("./routes/postRoutes");
const notFound = require("./middleware/errorMiddleware").notFound;
const errorHandler = require("./middleware/errorMiddleware").errorHandler;
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); //allow us to accept JSON data in body
// import express from "express";
// const app = express();
// import dotenv from "dotenv";
// import products from "./data/products.js";

// app.get("/", (req, res) => {
//   res.send("API running...");
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/posts", postRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
//hit this route and fetch the client id of PayPal

//we need to make "uploads" folder static to make it accessible
// images are in /uploads folder in backend. by this code you have it in frontend:
__dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log(path.join(__dirname, "uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

//middleware for "Custom Erro handling"
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
