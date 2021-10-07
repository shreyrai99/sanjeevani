const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
} = require("../controllers/userController");

router.post("/login", authUser); //authenticate user

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); //protect middleware runs whenever we hit this route

router.route("/").post(registerUser); //register user

module.exports = router;
