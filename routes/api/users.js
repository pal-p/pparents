const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "users is working" }));

module.exports = router;
