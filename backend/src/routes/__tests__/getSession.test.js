const request = require('supertest');
const sessions = require('../routes/sessions');
const express = require('express');

const app = express();
app.use('/sessions', sessions);

// const mongoose = require('mongoose');
// const databaseName = 'testSessions';
//
// beforeAll(async () => {
//   const url = `mongodb://127.0.0.1/${databaseName}`;
//   await mongoose.connect(url, {useNewUrlParser: true});
// });


describe('GET /sessions/:id', () => {
  it('can not find a session with invalid id', async (done) => {
    const response = await request(app).get('/sessions/c2345');
    expect(response.statusCode).toBe(404);
    done();
  });

  it('gets a session by its id', async (done) => {
    const response = await request(app).get('/sessions/c2345');
    expect(response.body._id).toBeTruthy();
    expect(response.body.truncCode).toEqual('');
    expect(response.body.isFinished).toBeTruthy();
    expect(response.body.preferences).toEqual('');
    expect(response.body.results).toEqual('');
    expect(response.statusCode).toBe(200);
    done();
  });

  // it('returns a 500 when a internal error is encountered',async (done) => {
  // });
});
