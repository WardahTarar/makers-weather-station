var express = require('express');
var router = express.Router();
var request = require('request');
var Weather = require('../src/models/weather');

router.get('/', function(req, res, next) {
  request('http://localhost:3000/api/data', function(error, response, body) {
    res.render('index', { weather_data: JSON.parse(body).data });
  });
});

module.exports = router;
