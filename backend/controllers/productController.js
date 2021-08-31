const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

/*
@desc:  FETCH ALL PRODUCTS
@route: GET /api/products
@access Public
*/
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/*
@desc:  Fetch single product
@route: GET /api/products/:id
@access Public
*/
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

module.exports = {
  getProducts,
  getProductById
};
