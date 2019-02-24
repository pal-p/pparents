const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
require("../../models/Post");
const Post = mongoose.model("posts");
const validatePost = require("../../validation/post");

router.get("/test", (req, res) => res.json({ msg: "posts is working" }));

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, validation } = validatePost(req.body);
    if (!validation) {
      return res.status(400).json(errors);
    }
    const tempPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      picture: req.body.picture
    });
    tempPost.save().then(post => res.json(post));
  }
);
module.exports = router;
