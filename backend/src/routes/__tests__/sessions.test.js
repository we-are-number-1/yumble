const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
// const request = require('supertest');
const sessions = require('../sessions');
const express = require('express');

jest.mock('../../index.js');

let mongod;
let server;
let mockSession;

const app = express();
app.use(express.json());
app.use('/sessions', sessions);

beforeAll(async (done) => {
  mongod = new MongoMemoryServer();

  const connectionString = await mongod.getUri();
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  server = app.listen(0, () => {
    port = server.address().port;
    done();
  });
});

beforeEach(async () => {
  const coll = await mongoose.connection.db.createCollection('sessions');

  mockSession = {
    'preferences': {
      'location': 'Auckland',
      'distance': 10,
      'cuisines': [
        'Thai',
        'Japanese',
        'Chinese',
      ],
      'price': 5,
      'timer': 20,
      'coordinates': {
        'lat': 34.6424325,
        'lng': 10.2343462,
      },
    },
    'results': [],
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


