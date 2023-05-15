// wiki.js - Wiki route module.

const express = require("express");
const { Auth } = require("../operations/auth");
const router = express.Router();

// Home page route.
router.get("/dashboard", function (req, res) {
  res.send("home page");
});
router.post("/login", async function (req, res) {
    try {   
     const login = await  Auth({user:req.body.username,password:req.body.password})
     if(!login.token){
     return res.status(401).send({"error":login})
     }
     return res.status(200).send(login)
    } catch (error) {
      res.status(401).json(error)
      console.log('o')
    }
  });

module.exports = router;
