const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
require("../../models/User");
const User = mongoose.model("users");
require("../../models/Profile");
const Profile = mongoose.model("profiles");
const validateProfile = require("../../validation/profile");
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

//post request to .../api/profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, validation } = validateProfile(req.body);
    if (!validation) {
      return res.status(400).json(errors);
    }
    const profileData = {};
    profileData.user = req.user.id;
    if (req.body.location) profileData.location = req.body.location;
    if (req.body.status) profileData.status = req.body.status;
    if (req.body.bio) profileData.bio = req.body.bio;

    if (typeof req.body.babyBirthIssues !== "undefined") {
      profileData.babyBirthIssues = req.body.babyBirthIssues.split(",");
    }
    console.log(req.body);
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        console.log("new profile ");
        //create and save in db
        new Profile(profileData).save().then(profile => res.json(profile));
      }
    });
  }
);
router.get("/all", (req, res) => {
  //find all profiles
  Profile.find()
    .populate("user", ["name", "picture"])
    .then(profiles => {
      if (!profiles) {
        return res.status(404).json("No profile exists");
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "No profile exists" }));
});

router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "picture"])
    .then(profile => {
      if (!profile) {
        res.status(404).json({ profile: "No profile exists for this user" });
      }

      res.json(profile);
    }) // if user id in the url is invalid
    .catch(err =>
      res.status(404).json({ profile: "No profile exists for this user" })
    );
});
module.exports = router;
