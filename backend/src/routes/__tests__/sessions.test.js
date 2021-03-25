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

describe('PATCH', () => {
  it('should be able to update the session object', async () => {
    const body = {
      preferences: {},
      results: [],
    };

    let response = await axios.post(`http://localhost:${port}/sessions`, body);
    let returnTask = response.data;

    const updateBody = {
      isFinished: true,
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

      results: [
        {
          name: 'Thai Restaurant',
          location: '1 Thai Street',
          numberOfVotes: 5,
        },
        {
          name: 'Japanese Restaurant',
          location: '1 Japan Street',
          numberOfVotes: 3,
        },
        {
          name: 'Chinese Restaurant',
          location: '1 China Street',
          numberOfVotes: 7,
        },
      ],
    };

    response = await axios.patch(
        `http://localhost:${port}/sessions/${returnTask.truncCode}`,
        updateBody,
    );

    returnTask = response.data;

    expect(response.status).toBe(200);
    expect(returnTask.isFinished).toBe(true);
    expect(returnTask.preferences.location).toBe('Sydney');
    expect(returnTask.results[1].name).toBe('Japanese Restaurant');
  });
});
