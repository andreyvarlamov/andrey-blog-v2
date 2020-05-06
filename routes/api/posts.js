const express = require("express");
const router = express.Router();

// Mongoose Models
const Post = require("../../models/Post");

// @route GET /api/posts
// @desc Get All Posts
// @access Public
router.get("/", (req, res) => {
  console.log("DEBUG: GET posts");
  Post.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

// @route POST /api/posts
// @desc Add a New Post
// @access Public
router.post("/", (req, res) => {
  console.log("DEBUG: POST posts");
  const { title, body, postedBy } = req.body;

  const newPost = new Post({
    title,
    body,
    postedBy,
  });

  newPost
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

// @route DELETE /api/posts/:id
// @desc Delete a Specific Post
// @access Public
router.delete("/:id", (req, res) => {
  console.log("DEBUG: DELETE posts");
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
