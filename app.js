var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Firebase = require("firebase");

var app = express();

var currentUser = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  if(currentUser == ""){
    res.render('index', { title: 'Social Blackboard' });
  } else {
    res.redirect('/drawPanel');
  }
});

app.get('/login', (function(req, res) {
  res.redirect('/');
}));

app.post('/login', (function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  /*

  Si pretendí implementar Firebase, pero me dió
  muchos problemas. Cree la BD en el site oficial,
  en el archivo view/layout.jade hago las inicializaciones
  pertinentes. En este archivo, linea 7, declare la variable
  requerida. Y aquí añadía la siguiente linea:

     var ref = new Firebase("https://zboxtest-86766.firebaseio.com");

  Pero en el explorador me decia que Firebase no es una
  función y no conseguí como resolver.

  Comprendo, que despues podia hacer la autenticación con
  las siguientes lineas de codigo:

   ref.authWithPassword({
       email    : username,
       password : password
     }, function(error, authData) {
     if (error) {
      console.log("Login Failed!", error);
     } else {
      console.log("Authenticated successfully with payload:", authData);
     }
   });

   */

  if( ( username == 'user1@zbox-test.com' ||
        username == 'user2@zbox-test.com' ||
        username == 'user3@zbox-test.com' )
      && password == '123456' ){
    currentUser = username;
    res.redirect('/drawPanel');
  }
  else {
    currentUser = "";
    res.redirect('/?error=1');
  }
}));

app.get('/logout', (function(req, res) {
  currentUser = '';
  res.redirect('/');
}));

app.get('/drawPanel', (function(req, res) {
  if(currentUser == ""){
    res.redirect('/');
  } else {
    res.render('drawPanel', { title: 'Social Blackboard' });
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}); // */

module.exports = app;