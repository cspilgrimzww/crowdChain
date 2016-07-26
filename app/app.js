var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//import lib
var resSession = require('./lib/filter').resSession;

var index = require('./routes/index');
var loginRoute = require('./routes/json/login');
var mainRoute = require('./routes/main');
var Project = require('./routes/project');
var comment = require('./routes/comment');
var hbs = require('express-handlebars');
var mongoose = require('mongoose');

//import models
var Users = require('./models/Users').Users;

mongoose.connect('mongodb://localhost/crowdchain');

var app = express();

var demodata = require('./help_utils/demoData').demoData;
demodata();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs',
  layoutsDir: 'views/layouts'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', resSession, loginRoute);
app.use('/', index);
app.use('/', Project);
app.use('/', mainRoute);
app.use('/', comment);

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
    res.render('404', {
      message: err.message,
      error: err,
      layout:false
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
});




module.exports = app;
