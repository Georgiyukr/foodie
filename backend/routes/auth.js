const express = require("express");
const router = express.Router();
let models = require("../models/schemas");
// require user schema from models
const User = models.User;

module.exports = function(passport, hash) {
  //register a new user in database
  router.post("/register", function(req, res) {
    let newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hash(req.body.password)
    });
    newUser
      .save()
      .then(response => {
        res.json({ success: true, user: newUser });
      })
      .catch(error => {
        console.log("ERROR IN POST /REGISTER", error);
      });
  });

  // user login  with authentication
  router.post("/login", passport.authenticate("local"), function(req, res) {
    if (req.user) {
      console.log(`User: ${req.user.username} is logged in!`);
      res.json({ success: true, user: req.user });
    } else {
      res.json({ success: false });
    }
  });

  // user log out
  router.post("/logout", (req, res) => {
    req.logout();
    if (!req.user) {
      res.json({ success: true });
    } else res.json({ success: false });
  });

  return router;
};
