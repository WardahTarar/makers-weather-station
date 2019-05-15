'use strict';

// weatherModel.js
var mongoose = require('mongoose'); // Setup schema

var weatherSchema = new mongoose.Schema(
  {
    temperature: {
      type: Number,
      min: -100.0,
      max: 100.0,
      required: [true, 'We need a temperature data...']
    },
    pressure: Number,
    humidity: Number,
    date: String
  },
  {
    timestamps: true
  }
);
// We need (module.exports = ...) for Weather model to be a constructor
var Weather = (module.exports = mongoose.model('weather_data', weatherSchema));

module.exports.getData = function(callback, limit) {
  Weather.find(callback).limit(limit);
};
