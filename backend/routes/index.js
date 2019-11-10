const express = require("express");
const router = express.Router();
const { User, Restaurant } = require("../models/schemas");

module.exports = function(hash) {
  // route to add new restaurant to the DB
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

  // route to find a specific restaurant by its username
  router.get("/restaurant/:restaurantUsername", (req, res) => {
    let restaurantUsername = req.params.restaurantUsername;

    Restaurant.findOne({ restaurantUsername: restaurantUsername }, function(
      err,
      restaurant
    ) {
      if (err) {
        console.log("ERROR IN GET /RESTAURANT/restaurantUsername", err);
      } else {
        res.json({ success: true, restaurant: restaurant });
      }
    });
  });

  // route to add dish/es to menu list of specific restaurant
  router.post("/addtomenu", (req, res) => {
    let restaurantUsername = req.body.restaurantUsername;
    let addToMenu = req.body.menu;

    Restaurant.findOne({ restaurantUsername: restaurantUsername }, function(
      err,
      restaurant
    ) {
      if (err) {
        console.log("ERROR IN POST /ADDTOMENU", err);
      } else {
        let currentMenu = restaurant.menu;
        restaurant.menu = [...currentMenu, ...addToMenu];
        restaurant
          .save()
          .then(response => {
            res.json({ success: true, restaurant: restaurant });
          })
          .catch(error => {
            console.log("ERROR IN SAVING ADDED MENU", error);
          });
      }
    });
  });

  return router;
};
