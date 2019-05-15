var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mainPageRouter = require('./routes/mainPage');
var apiRouter = require('./routes/api');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //view holder
app.set('view engine', 'ejs'); // what engine is used to create views

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/makers_weather_project', {
  useNewUrlParser: true
});

app.use('/', mainPageRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Below is created for the error.ejs
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  res.render('error'); //renders the view error.ejs
});

module.exports = app;
