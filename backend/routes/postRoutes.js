const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  deleteComment,
  commentOnPost
} = require("../controllers/postController");

router
  .route("/")
  .post(protect, createPost)
  .get(protect, getPosts);

router.route("/:id/like").post(protect, likePost);
router.route("/:id/unlike").post(protect, unlikePost);

router.route("/:id/comment").post(protect, commentOnPost);
router.route("/:id/comment/:comment_id").delete(protect, deleteComment);

router
  .route("/:id")
  .get(protect, getPostById)
  .delete(protect, deletePost);

module.exports = router;
