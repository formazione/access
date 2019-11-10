// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

var userName1 = process.env.USERNAME1;
var userPass1 = process.env.PASSWORD1;

var userName2 = process.env.USERNAME2;
var userPass2 = process.env.PASSWORD2;

var basicAuth = require("basic-auth");

app.use(function(request, response, next) {
  var user = basicAuth(request);
  console.log(user);
  
  
  if (!user || user.name !== userName1 || user.pass !== userPass1) {
    response.set("WWW-Authenticate", 'Basic realm="example"');
    return response.status(401).send();
  }
  
  else if (!user || user.name !== userName2 || user.pass !== userPass2) {
    response.set("WWW-Authenticate", 'Basic realm="example"');
    return response.status(401).send();
  }
  
  return next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
// DIFFERENT PAGES FOR EACH NAME
if (userName1 == "john"){
  app.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/john.html");
  });
}

else if (userName2 == "sara"){
  app.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/sara.html");
  });
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
