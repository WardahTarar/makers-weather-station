var express = require('express');
var router = express.Router();
var Weather = require('../src/models/weather');

router.get('/', function(req, res, next) {
  Weather.find({}, function(err, result) {
    res.render('index', { weather_data: result });
  });
});

module.exports = router;
