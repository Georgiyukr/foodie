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
let models = require("./models/schemas");
// require user schema from models
const User = models.User;

// MONGO DB CONNECTION
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());

//hash function for inputting data into db
function hash(password) {
  var hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

// Session info here
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    store: new MongoStore({
      mongooseConnection: require("mongoose").connection
    })
  })
);

// Passport Serialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// Passport Deserialize
passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    if (err) {
      console.log("Failed", err);
    } else {
      done(null, user);
    }
  });
});

// Passport Strategy
passport.use(
  new LocalStrategy(function(username, password, done) {
    // Find the user with the given username
    User.findOne({ username: username }, function(err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {
        console.log(err);
        return done(err);
      }
      // if no user present, auth failed
      if (!user) {
        console.log(user);
        return done(null, false);
      }
      // if passwords do not match, auth failed
      if (user.password !== hash(password)) {
        return done(null, false);
      }
      // auth has has succeeded
      return done(null, user);
    });
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", dbAuth(passport, hash));
app.use("/", dbIndex());

//register a new user in database
app.post("/register", function(req, res) {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });
  newUser
    .save()
    .then(response => {
      res.json({ success: true, user: newUser });
    })
    .catch(error => {
      console.log("ERROR IN POST /REGISTER");
    });
});

app.listen(3000, () => {
  console.log("Server for Foodie App listening on port 3000!");
});

module.exports = app;
