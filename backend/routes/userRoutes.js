const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers
} = require("../controllers/userController");

router.post("/login", authUser); //authenticate user

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); //protect middleware runs whenever we hit this route

router.route("/").post(registerUser); //register user
router.route("/").get(protect, admin, getUsers); //Get all users, admin only

module.exports = router;
