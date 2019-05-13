var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //view holder
app.set('view engine', 'ejs'); // what engine is used to create views

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// This is executed everytime the app receives a request - no mount path
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // locals = local variable valid for the lifetime of request
  res.locals.message = err.message; //assigns error message

  res.locals.error = req.app.get('env') === 'development' ? err : {}; //TO TEST

  // render the error page
  // res.status = response status 200, 300....
  // err.status is 404
  // assigns response to error status to use in error.ejs
  res.status(err.status || 500); //TO TEST

  res.render('error'); //renders the view error.ejs
});

module.exports = app;
