const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Mongoose Models
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route GET /api/posts
// @desc Get All Posts
// @access Public
router.get("/", (req, res) => {
  console.log("DEBUG: GET posts");

  const { postedBy } = req.query;

  if (postedBy) {
    if (!mongoose.Types.ObjectId.isValid(postedBy))
      return res.status(400).json({ msg: "Invalid ObjectID" });

    Post.find({ postedBy })
      .sort({ date: -1 })
      .populate("postedBy")
      .exec((err, posts) => {
        if (err) console.log("posts error" + err);
        else res.json(posts);
      });
  } else {
    Post.find()
      .sort({ date: -1 })
      .populate("postedBy")
      .exec((err, posts) => {
        if (err) console.log(err);
        else res.json(posts);
      });
  }
});

// @route POST /api/posts
// @desc Add a New Post
// @access Public
router.post("/", (req, res) => {
  console.log("DEBUG: POST posts");
  const { title, body, postedBy } = req.body;

  User.findOne({ name: postedBy }).then(user => {
    if (!user) res.status(400).json({ msg: "No user with such name" });
    else {
      user.numOfPosts++;

      user
        .save()
        .then()
        .catch(err => console.log(err));

      const newPost = new Post({
        title,
        body,
        postedBy: user,
      });

      newPost
        .save()
        .then(item => res.json(item))
        .catch(err => console.log(err));
    }
  });
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
