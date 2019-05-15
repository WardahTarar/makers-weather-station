//Import Weather model
var Weather = require('../src/models/weather.js');

// get data
exports.index = function(req, res) {
  Weather.find({}, function(err, result) {
    res.json({
      data: result
    });
  });
};

// get n number of records
exports.getRecords = function(req, res) {
  let limit = parseInt(req.params.limit);
  Weather.getData(function(err, result) {
    res.json({
      data: result
    });
  }, limit);
};

// insert one record
exports.insert = function(req, res) {
  // let data = JSON.parse(req.body.data);
  let data = req.body.data;

  const weather = new Weather({
    temperature: data.temperature,
    pressure: data.pressure,
    humidity: data.humidity,
    date: data.date
  });

  weather.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: 'New weather object created!',
        data: weather
      });
    }
  });
};

// insert multiple records
exports.insertMany = function(req, res) {
  // let data = JSON.parse(req.body.data);

  Weather.insertMany(req, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: 'New weather objects saved'
      });
    }
  });
};

// delete one record by id
exports.delete = function(req, res) {
  Weather.deleteOne(
    {
      _id: req.params.weather_id
    },
    function(err, weather) {
      res.json({
        status: 'Success',
        message: 'Weather data deleted',
        weather: weather
      });
    }
  );
};

// delete multiple records
exports.deleteAll = function(req, res) {
  Weather.deleteMany({}, function(err, weather) {
    res.json({
      status: 'Success',
      message: 'All weather data deleted',
      weather: weather
    });
  });
};
