const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

const jwtSecret = process.env.JWT_SECRET;

const auth = require("../../middleware/auth");

// @route POST /api/auth
// @desc Authenticate a User
// @access Public
router.post("/", (req, res) => {
  console.log("DEBUG: POST auth");
  const { email, password } = req.body;

  const { msg, isValid, emailValid } = validateLoginInput(req.body);

  if (!emailValid) return res.status(400).json({ msg });

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });
      if (!isValid) return res.status(400).json({ msg });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

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
      });
    })
    .catch(err => console.log(err));
});

// @route GET /api/auth/users
// @desc Get user date based on token
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

module.exports = router;
