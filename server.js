// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require NY schema
var History = require("./models/ny");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://mehdi:1234@ds127883.mlab.com:27883/heroku_63pvmxz6");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


app.get("/", function(req, res) {

History.find({}).sort([
  ["date", "descending"]
]).limit(20).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else{
      res.send(doc)
    }
  })
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/", function(req, res) {

 console.log(req.body);

  History.create({
    title: req.body.title,
    date: req.body.date,
    url:req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      // res.send("Saved Search");
      console.log("saved")
    }
  });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
