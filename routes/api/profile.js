const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
require("../../models/User");
const User = mongoose.model("users");
require("../../models/Profile");
const Profile = mongoose.model("profiles");

router.get("/test", (req, res) => res.json({ msg: "profile is working" }));

//get request to .../api/profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res
            .status(404)
            .json({ profile: "No profile exists for this user" });
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
