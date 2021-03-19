const request = require('supertest');
const sessions = require('../routes/sessions');
const express = require('express');

const app = express();
app.use('/sessions', sessions);


describe('GET /sessions/testCard', () => {
  test('It should respond with a basic static JSON file', async () => {
    const response = await request(app).get('/sessions/testCard');
    expect(response.body.name).toEqual('Lonestar');
    expect(response.body.location).toEqual('Wiri');
    expect(response.body.cuisine).toEqual(['European']);
    expect(response.body.price).toEqual('$$');
    expect(response.statusCode).toBe(200); ;
  });
});
