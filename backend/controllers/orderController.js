const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

/*
@desc:  Create new order
@route: POST /api/orders
@access Private
*/
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      itemsPrice,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

module.exports = {
  addOrderItems
};
