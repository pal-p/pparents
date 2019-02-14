const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbURI = require("./config/keys").MONGOURI;

//connect to mongodb
mongoose
  .connect(dbURI)
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hi there!"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("app is at port ${port}"));
