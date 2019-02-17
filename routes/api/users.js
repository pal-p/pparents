const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const mongoose = require("mongoose");
require("../../models/User");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

router.get("/test", (req, res) => res.json({ msg: "users is working" }));

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const picture = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", // rating
        d: "mm" // default to user icon pic
      });
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        picture
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user in db
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }
    bcrypt.compare(password, user.password).then(isMatched => {
      if (isMatched) {
        //if matched then generate token
        const payload = {
          id: user.id,
          password: user.password,
          picture: user.picture
        };
        const jwtExpiry = {
          expiresIn: 3600
        };
        jwt.sign(payload, keys.jwtSecret, jwtExpiry, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

module.exports = router;
