const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders
} = require("../controllers/orderController");

/*
@desc:  Get logged in user's orders
@route: GET /api/orders/myorders
@access Private
*/
router.route("/myorders").get(protect, getMyOrders);

/*
@desc:  Create new order
@route: POST /api/orders
@access Private
*/
router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

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

/*
@desc:  Update order to Delivered
@route: PUT /api/orders/:id/deliver
@access Private/Admin
*/
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

module.exports = router;
