const express = require("express");
const mongoose = require("mongoose");
const dbURI = require("./config/keys").MONGOURI;
const bodyParser = require("body-parser");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const passport = require("passport");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const users = require("./routes/api/users");

//connect to mongodb
mongoose
  .connect(dbURI)
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

//app.get("/", (req, res) => res.send("hi there!"));

//using passport
app.use(passport.initialize());
//using jwt strategy of passport
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app is at port ${port}`));
