const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// @route GET /api/users
// @desc Get All Users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .populate("posts")
    .exec((err, users) => {
      if (err) console.log(err);
      else res.json(users);
    });
});

// @route POST /api/users
// @desc Create a New User
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) res.status(400).json({ msg: "User already exists" });
    else {
      const newUser = new User({
        name,
        email,
        password,
      });

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
