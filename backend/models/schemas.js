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
    type: Number
    //add required
  },
  expirationDate: {
    type: Date
    //add required
  },
  securityCode: {
    type: Number
    //add required
  }
});

let User = mongoose.model("User", userSchema);

module.exports = {
  User: User
};
