var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = 3001;

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

/*app.get("/", function (req, res) {
  //console.log('username: ', req.query.name);
  res.redirect("index.html");
});
*/
app.get('/', function(req,res){
  res.send('templates/login.html');
});

app.get('/api', function(req,res){
  //GET parameters in url.. Example: index.html?name=Test
  //OUTPUT = GET PARAM: Test
  console.log('GET PARAM: ', req.query.name);
});

app.post('/login', function(req,res){
  //POST parameters
  //console.log('POST PARAM: ', req.body.name);
  var status = false,
      params = req.body;

  if(params.username == 'sunny' && params.password == 'test'){
    status = true;
  }
  //Sends answer back..
  res.json({message: status});
});


console.log("Server listening at http://localhost:" + port);
app.listen(port);