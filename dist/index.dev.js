"use strict";

// index.js

/**
 * Required External Modules
 */
var express = require("express");

var path = require("path");

var fs = require('fs');

var http = require('http');

var https = require('https');
/**
 * App Variables
 */


var app = express();
var port = process.env.PORT || "80"; // Certificate

var privateKey = fs.readFileSync('/etc/letsencrypt/live/the429podcast.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/the429podcast.com/cert.pem', 'utf8');
var ca = fs.readFileSync('/etc/letsencrypt/live/the429podcast.com/chain.pem', 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};
/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express["static"](path.join(__dirname, "assets")));
/**
 * Routes Definitions
 */

app.use('/', require('./routes/index'));
/**
 * Server Activation
 */
// Starting both http & https servers

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(80, function () {
  console.log('HTTP Server running on port 80');
});
httpsServer.listen(443, function () {
  console.log('HTTPS Server running on port 443');
});