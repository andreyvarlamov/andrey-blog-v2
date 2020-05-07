const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Mongoose Models
const Post = require("../../models/Post");
const User = require("../../models/User");

const auth = require("../../middleware/auth");

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
      .populate("postedBy", "-password")
      .exec((err, posts) => {
        if (err) console.log("posts error" + err);
        else res.json(posts);
      });
  } else {
    Post.find()
      .sort({ date: -1 })
      .populate("postedBy", "-password")
      .exec((err, posts) => {
        if (err) console.log(err);
        else res.json(posts);
      });
  }
});

// @route POST /api/posts
// @desc Add a New Post
// @access Private
router.post("/", auth, (req, res) => {
  console.log("DEBUG: POST posts");
  const { title, body } = req.body;

  User.findById(req.user.id).then(user => {
    if (!user) res.status(400).json({ msg: "No user with such id" });
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
        .then(post => {
          const postObj = post.toObject();
          delete postObj.postedBy.password;
          res.json(postObj);
        })
        .catch(err => console.log(err));
    }
  });
});

// @route DELETE /api/posts/:id
// @desc Delete a Specific Post
// @access Private
router.delete("/:id", auth, (req, res) => {
  console.log("DEBUG: DELETE posts");
  Post.findById(req.params.id)
    .then(post => {
      if (post.postedBy.toString() !== req.user.id)
        return res.status(401).json({ msg: "Unauthorized to delete the post" });

      // Decrease numOfPosts in the associated user
      User.findById(post.postedBy.toString())
        .then(user => {
          user.numOfPosts--;

          user.save();
        })
        .catch(err => console.log(err));

      post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
