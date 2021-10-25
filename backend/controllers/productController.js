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

/*
@desc:  Delete a  product
@route: DELETE /api/products/:id
@access Private/Admin
*/
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    // if we want only admin who created to delete then:
    /*
    if(req.user._id===product.user._id){

    }
    */
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

/*
@desc:  Create a  product
@route: POST /api/products
@access Private/Admin
*/
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/logo192.png",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description"
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/*
@desc:  UPDATE a  product
@route: PUT /api/products/:id
@access Private/Admin
*/
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    countInStock,
    description,
    category
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.countInStock = countInStock;
    product.description = description;
    product.category = category;

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
};
