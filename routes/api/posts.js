const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
require("../../models/Post");
const Post = mongoose.model("posts");
const validatePost = require("../../validation/post");

router.get("/test", (req, res) => res.json({ msg: "posts is working" }));

//like a post
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).json({ postLiked: "Post is already liked" });
        }
        //if user has not liked the post, add their id in likes
        post.likes.push({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postErr: "Post not found" }));
  }
);
//get all postsby descending date order
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
});

//get a post by id
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ postErr: "No post exists with this id" })
    );
});

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
