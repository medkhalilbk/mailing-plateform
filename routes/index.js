// wiki.js - Wiki route module.

const express = require("express");
const router = express.Router();

// Home page route.
router.get("/web-service", function (req, res) {
  res.send("Wiki home page");
});
router.get("/login", function (req, res) {
    res.send("login page");
  });

module.exports = router;
