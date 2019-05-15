const request = require('supertest');
const requestTest = require('supertest')('http://localhost:3000');
const app = require('../app.js');
const nock = require('nock');
var Weather = require('../src/models/weather.js');

describe('Test API calls', () => {
  test('GET /api/data method returns 200', function(done) {
    request(app)
      .get('/api/data')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  test('GET /api method does a redirect', function(done) {
    request(app)
      .get('/api')
      .expect(302)
      .expect('Location', '/api/data')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  test('POST /api/data method returns 200', function(done) {
    request(app)
      .post('/api/data')
      .send({
        data: {
          temperature: 5,
          pressure: 2,
          humidity: 5,
          date: '2012-04-23'
        }
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  //Error test
  test('POST /api/data method returns 200', function(done) {
    request(app)
      .post('/api/data')
      .send({
        data: {
          temperature: 5,
          pressure: 'dsa',
          humidity: 5,
          date: '2012-04-23'
        }
      })
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body._message).toEqual('weather_data validation failed');
        done();
      });
  });

  test('GET /api/data/1 method gets 1 record out', function(done) {
    request(app)
      .get('/api/data/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.data.length).toEqual(1);
        done();
      });
  });

  test('POST /api/data/bulkInsert method adds 2 items to db', function(done) {
    request(app)
      .post('/api/data/bulkInsert')
      .send([
        {
          temperature: 5,
          pressure: 5,
          humidity: 5,
          date: '2012-04-23'
        },
        {
          temperature: 5,
          pressure: 5,
          humidity: 5,
          date: '2012-04-23'
        }
      ])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.message).toEqual('New weather objects saved');
        done();
      });
  });

  // Error test
  test('POST /api/data/bulkInsert method adds 2 items to db', function(done) {
    request(app)
      .post('/api/data/bulkInsert')
      .send([
        {
          temperature: 5,
          pressure: 'ds',
          humidity: 5,
          date: '2012-04-23'
        }
      ])
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body._message).toEqual('weather_data validation failed');
        done();
      });
  });

  test('DELETE /api/data/:weather_id method deletes 1 record out', function(done) {
    request(app)
      .delete(`/api/data/5cdb3fb39fd69469aa17b3f9`)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.status).toEqual('Success');
        done();
      });
  });

  test('DELETE /destroy/all method deletes everything', function(done) {
    request(app)
      .delete('/api/destroy/all')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.status).toEqual('Success');
        done();
      });
  });
});
