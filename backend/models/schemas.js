let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  creditCardNumber: {
    type: String,
    required: true
  },
  securityCode: {
    type: String,
    required: true
  },
  order: {
    type: Array
  },
  currentVisit: {
    type: Object
  },
  payments: {
    type: Array
  }
});

let restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  currentTableOrders: {
    type: Array
  },
  menu: {
    type: Array
  }
});

let Restaurant = monggose.model("Restaurant", restaurantSchema);
let User = mongoose.model("User", userSchema);

module.exports = {
  User: User,
  Restaurant: Restaurant
};
