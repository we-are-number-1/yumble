const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const express = require('express');
const sessions = require('../../routes/sessions');
const axios = require('axios');

jest.mock('../../index.js');

let mongod;
let server;
let mockSession;
let app;
let port;

beforeAll(async (done) => {
  mongod = new MongoMemoryServer();

  const connectionString = await mongod.getUri();
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app = express();
  app.use(express.json());
  app.use('/sessions', sessions);

  server = app.listen(0, () => {
    port = server.address().port;
    done();
  });
});

beforeEach(async () => {
  const coll = await mongoose.connection.db.createCollection('sessions');

  mockSession = {
    preferences: {
      location: 'Auckland',
      distance: 10,
      cuisines: ['Thai', 'Japanese', 'Chinese'],
      price: 5,
      timer: 20,
      coordinates: {
        lat: 34.6424325,
        lng: 10.2343462,
      },
    },
    results: [],
  };
  await coll.insertOne(mockSession);
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection('sessions');
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();

    done();
  });
});

describe('GET /sessions/:id', () => {
  it('should return the session object', async () => {
    const body = {
      preferences: {
        location: 'Sydney',
        distance: 10,
        cuisines: ['Thai', 'Japanese', 'Chinese'],
        price: 20,
        timer: 600,
        coordinates: {
          lat: 34.6424325,
          lng: 10.2343462,
        },
      },
      results: [],
    };

    let response = await axios.post(`http://localhost:${port}/sessions`, body);
    let returnTask = response.data;

    response = await axios.get(
        `http://localhost:${port}/sessions/${returnTask.truncCode}`,
    );

    returnTask = response.data;

    expect(returnTask.isFinished).toBe(false);
    expect(returnTask._id).toBeDefined();
    expect(returnTask.preferences.distance).toBe(10);
    expect(returnTask.preferences.location).toBe('Sydney');
    expect(returnTask.preferences.price).toBe(20);
    expect(response.status).toBe(200);
  });
});

