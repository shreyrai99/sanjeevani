const Post = require("../models/postModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

/* 
@desc:  GET all posts
@route: GET /api/posts
@access Private
*/
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.json(posts);
});

/* 
@desc:  GET post by ID
@route: GET /api/posts/
@access Private
*/
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    //return res.status(404).json({ message: "Post not found" });
    res.status(404);
    throw new Error("Post not found!");
  }

  res.json(post);
});

/* 
@desc:  Create a Post
@route: POST /api/post
@access Private
*/
const createPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { text, title, link, image } = req.body;
  if (!text || !title) {
    res.status(400);
    throw new Error("Title and text should not be empty!");
  }
  const postCreate = new Post({
    text,
    title,
    link,
    image,
    user: req.user._id,
    name: user.name,
    postByAdmin: user.isAdmin
  });

  const newPost = await postCreate.save();
  res.status(201).json(newPost);
});

/*
@desc:  Delete a  Post
@route: DELETE /api/posts/:id
@access Private/Admin
*/
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to delete post");
  }
  await post.remove();
  res.json({ message: "Post deleted successfiully" });
});

/*
@desc:  Like a  Post
@route: POST /api/posts/:id/like
@access Private
*/
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  }

  if (post.likes.some(like => like.user.toString() === req.user.id)) {
    res.status(400);
    throw new Error("User already liked post");
  }
  post.likes.unshift({ user: req.user.id });
  await post.save();
  return res.json(post);
});

/*
@desc:  Unlike a  Post
@route: POST /api/posts/:id/unlike
@access Private
*/
const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  }

  if (!post.likes.some(like => like.user.toString() === req.user.id)) {
    res.status(400);
    throw new Error("Post not liked yet");
  }
  post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);
  await post.save();
  return res.json(post);
});

/*
@desc:  Comment on Post
@route: POST /api/posts/:id/comment
@access Private
*/
const commentOnPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.user.id);
  const { text, title, link, image } = req.body;

  if (!text || !title) {
    res.status(400);
    throw new Error("Title and text should not be empty!");
  }
  const commentCreate = {
    text,
    title,
    link,
    image,
    user: req.user._id,
    name: user.name
  };
  post.comments.unshift(commentCreate);
  await post.save();
  res.status(201).json(post);
});

/*
@desc:  Delete a  Comment
@route: DELETE /api/posts/:id/comment/:comment_id
@access Private/Admin
*/
const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  }
  const comment = post.comments.find(com => com.id === req.params.comment_id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment doesnot exists!");
  }
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to delete comment");
  }

  post.comments = post.comments.filter(com => com.id !== req.params.comment_id);
  await post.save();
  res.json({ message: "Comment deleted successfiully" });
});
module.exports = {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment
};
