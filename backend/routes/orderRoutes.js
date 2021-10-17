const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { addOrderItems } = require("../controllers/orderController");

/*
@desc:  Create new order
@route: POST /api/orders
@access Private
*/
router.route("/").post(protect, addOrderItems);

module.exports = router;
