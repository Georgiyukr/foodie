const express = require("express");
const app = express();
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
const dbAuth = require("./routes/auth.js");
const dbIndex = require("./routes/index.js");
let path = require("path");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let crypto = require("crypto");
let session = require("express-session");
let MongoStore = require("connect-mongo")(session);
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

// require user schema from models

if (!process.env.MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not in the environmental variables. Try running 'source env.sh'"
  );
}

mongoose.connection.on("connected", function() {
  console.log("Success: connected to MongoDb!");
});

mongoose.connection.on("error", function() {
  console.log("Error connecting to MongoDb. Check MONGODB_URI in env.sh");
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.listen(3000, () => {
  console.log("Server for Foodie App listening on port 3000!");
});

module.exports = app;
