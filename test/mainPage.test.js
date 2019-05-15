const request = require('supertest');
const app = require('../app.js');
const nock = require('nock');

describe('Test main page index /', () => {
  test('GET / method returns 200', () => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  // Not working due to router in main page making a request (that part not covered)
  test('GET / method returns objects', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  test('GET /error page', function(done) {
    request(app)
      .get('/fsdsa')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
