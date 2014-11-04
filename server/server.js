var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = 3001;

app.get("/", function (req, res) {
	//console.log('username: ', req.query.name);
	res.redirect("index.html");
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/../public'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Server listening at http://localhost:" + port);
app.listen(port);