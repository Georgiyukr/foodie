const express = require("express");
const router = express.Router();
const { User, Restaurant } = require("../models/schemas");

module.exports = function(hash) {
  router.post("/restaurant", (req, res) => {
    let restaurantName = req.body.restaurantName;
    let password = req.body.password;
    let restaurantUsername = req.body.restaurantUsername;

    let newRestaurant = new Restaurant({
      restaurantName,
      password: hash(password),
      restaurantUsername
    });
    newRestaurant
      .save()
      .then(response => {
        res.json({ success: true, restaurant: newRestaurant });
      })
      .catch(error => {
        console.log("ERROR IN POST /RESTAURANT", error);
      });
  });
  return router;
};
