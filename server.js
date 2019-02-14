const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbURI = require("./config/keys").MONGOURI;
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

//connect to mongodb
mongoose
  .connect(dbURI)
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hi there!"));

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("app is at port ${port}"));
