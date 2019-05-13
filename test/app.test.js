const request = require('supertest');
const app = require('../app.js');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('It should response with an error page', async () => {
    const response = await request(app).get('/blahhh');

    expect(response.statusCode).toBe(404);
  });
});
