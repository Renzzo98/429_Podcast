// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const fs = require('fs');
const http = require('http');
const https = require('https');

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "80";


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');



/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "assets")));

/**
 * Routes Definitions
 */

app.use('/', require('./routes/index'));



/**
 * Server Activation
 */

 // Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});