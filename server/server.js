var express = require("express"),
    passport = require('./login'),
    expressSession = require('express-session'),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    students = require('./api/students'),
    port = 3001;

app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
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
/*
app.get('/api', function(req,res){
  //GET parameters in url.. Example: index.html?name=Test
  //OUTPUT = GET PARAM: Test
  console.log('GET PARAM: ', req.query.name);
});*/

app.post('/Login', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/check',
    failureFlash : true
}));

app.get('/Logout', function(req, res) {
  console.log('Logged out!!');
  req.logout();
  res.redirect('/');
});

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

app.get('/check', isAuthenticated, function(req, res){
    if(req.session.passport.user == undefined)
    {
      console.log('user: ' + req.session.passport.user.username  + ' is NOT authorized as ' + req.session.passport.user.type);
      res.json({login: false});
    }
    else
    {
      console.log('user: ' + req.session.passport.user.username  + ' is authorized as ' + req.session.passport.user.type);
      res.json({login: true, user: req.session.passport.user});
    }
});

app.get('/getUser', isAuthenticated, function(req, res){
    if(req.session.passport.user == undefined)
      res.json({});
    else
      res.json({username: req.session.passport.user.username, type: req.session.passport.user.type});
});

app.get('/api/students', isAuthenticated, function(req, res){
  //cars.list
  students.list(req, res);
}); 

app.get('/api/getStudent', function(req,res){
  console.log('get student!!');
  students.get(req, res);
});
/*app.post('/login', function(req,res){

  //POST parameters
  //console.log('POST PARAM: ', req.body.name);

  /*var status = false,
      params = req.body;

  if(params.username == 'sunny' && params.password == 'test'){
    status = true;
  }
  //Sends answer back..
  res.json({message: status});
});*/


console.log("Server listening at http://localhost:" + port);
app.listen(port);