const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid
} = require("../controllers/orderController");

/*
@desc:  Create new order
@route: POST /api/orders
@access Private
*/
router.route("/").post(protect, addOrderItems);

/*
@desc:  Get order by ID
@route: GET /api/orders/:id
@access Private
*/
router.route("/:id").get(protect, getOrderById);

/*
@desc:  Update order to Paid
@route: PUT /api/orders/:id/pay
@access Private
*/
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
