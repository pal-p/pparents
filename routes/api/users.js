const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const mongoose = require("mongoose");
require("../../models/User");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");
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

module.exports = router;
