const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { authUser, getUserProfile } = require("../controllers/userController");

router.post("/login", authUser);

router.route("/profile").get(protect, getUserProfile); //protect middleware runs whenever we hit this route

module.exports = router;
