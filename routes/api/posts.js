const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
require("../../models/Post");
const Post = mongoose.model("posts");
const validatePost = require("../../validation/post");

router.get("/test", (req, res) => res.json({ msg: "posts is working" }));

//delete post by id
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // Check if the login user is the owner of the post
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ authErr: "Not authorised" });
        }
        post.remove().then(() => res.json({ postDeleted: true }));
      })
      .catch(err =>
        res.status(404).json({ postErr: "No posts exists with this id" })
      );
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
