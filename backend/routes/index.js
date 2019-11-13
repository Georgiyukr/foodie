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

  //add order for the particular table; add additional order
  router.post("/placeorder", (req, res) => {
    let restaurantUsername = req.body.restaurantUsername;
    let order = req.body.order;
    let tableNum = req.body.tableNum;
    Restaurant.findOne({ restaurantUsername: restaurantUsername }, function(
      err,
      restaurant
    ) {
      if (err) {
        console.log("ERROR IN POST /placeorder", err);
      } else {
        for (let i = 0; i < restaurant.currentTableOrders.length; i++) {
          let currentOrder = restaurant.currentTableOrders[i];
          if (currentOrder.tableNum === tableNum) {
            restaurant.currentTableOrders.splice(i, 1);
          }
        }
        restaurant.currentTableOrders.push({
          tableNum: tableNum,
          order: order
        });

        restaurant
          .save()
          .then(response => {
            res.json({ success: true, restaurant: restaurant });
          })
          .catch(error => {
            console.log("ERROR IN SAVING Placing Order", error);
          });
      }
    });
  });

  // delete an order from the current customer order list
  router.post("/deletecustomer", (req, res) => {
    let restaurantUsername = req.body.restaurantUsername;
    let tableNum = req.body.tableNum;
    Restaurant.findOne({ restaurantUsername: restaurantUsername }, function(
      err,
      restaurant
    ) {
      if (err) {
        console.log("ERROR IN POST /deletecustomer", err);
      } else {
        for (let i = 0; i < restaurant.currentTableOrders.length; i++) {
          let currentOrder = restaurant.currentTableOrders[i];
          if (currentOrder.tableNum === tableNum) {
            restaurant.currentTableOrders.splice(i, 1);
          }
        }
        restaurant
          .save()
          .then(response => {
            res.json({ success: true, restaurant: restaurant });
          })
          .catch(error => {
            console.log("ERROR IN DELETING deletecustomer", error);
          });
      }
    });
  });
  //add payment to the user payments db
  router.post("/pay", function(req, res) {
    let username = req.body.username;
    let restaurantName = req.body.restaurantName;
    let total = req.body.total;
    console.log("USERNAME", restaurantName);
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        console.log("ERROR IN POST /pay", err);
      } else {
        user.payments.push({
          restaurantName: restaurantName,
          date: new Date(),
          total: total
        });
        user
          .save()
          .then(response => {
            res.json({ success: true, user: user });
          })
          .catch(error => {
            console.log("ERROR IN POST /Pay", error);
          });
      }
    });
  });

  return router;
};
