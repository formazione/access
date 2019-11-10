// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Only allow people who know the password set in .env to access the site
var userName = "guest";
var userPass = process.env.PASSWORD;

var basicAuth = require('basic-auth');

app.use(function (request, response, next) {
  var user = basicAuth(request);
  if (!user || user.name !== userName || user.pass !== userPass) {
    response.set('WWW-Authenticate', 'Basic realm="site"');
    return response.status(401).send();
  }
  return next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
