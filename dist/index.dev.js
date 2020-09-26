"use strict";

// index.js

/**
 * Required External Modules
 */
var express = require("express");

var path = require("path");
/**
 * App Variables
 */


var app = express();
var port = process.env.PORT || "8000";
/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express["static"](path.join(__dirname, "assets")));
/**
 * Routes Definitions
 */

app.get("/", function (req, res) {
  res.render("index", {
    title: "Home"
  });
});
app.get("/about", function (req, res) {
  res.render("about", {
    title: "About"
  });
});
/**
 * Server Activation
 */

app.listen(port, function () {
  console.log("Listening to requests on http://localhost:".concat(port));
});