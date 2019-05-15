var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weatherController');

//Redirect from  /api to /api/data
router.get('/', function(req, res, next) {
  res.redirect('/api/data');
});

// Retrieve all data
router.get('/data', function(req, res, next) {
  weatherController.index(req, res);
});

// Retrieve <limit> data
router.get('/data/:limit', function(req, res, next) {
  weatherController.getRecords(req, res);
});

// Post 1 item
router.post('/data', function(req, res, next) {
  weatherController.insert(req, res);
});

// Post bulk
router.post('/data/bulkInsert', function(req, res, next) {
  weatherController.insertMany(req.body, res);
});

// Delete 1 item
router.delete('/data/:weather_id', function(req, res, next) {
  weatherController.delete(req, res);
});

// Delete everything!!!! :(-)
router.delete('/destroy/all', function(req, res, next) {
  weatherController.deleteAll(req, res);
});

module.exports = router;
