const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../../validation/register");

const User = require("../../models/User");

const jwtSecret = process.env.JWT_SECRET;

// @route GET /api/users
// @desc Get All Users
// @access Public
router.get("/", (req, res) => {
  console.log("DEBUG: GET users");
  User.find()
    .select("-password")
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
  console.log("DEBUG: GET users");
  const { name, email, password } = req.body;

  const { msg, isValid, emailValid } = validateRegisterInput(req.body);

  if (!emailValid) return res.status(400).json({ msg });

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: "User already exists" });
      if (!isValid) return res.status(400).json({ msg });
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                jwtSecret,
                { expiresIn: 604800 },
                (err, token) => {
                  if (err) throw err;

                  return res.json({
                    token,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
