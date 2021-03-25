const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');

jest.mock('../../index.js');

let mongod;
let server;
let mockSession;
let port;

const app = express();
app.use(express.json());

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
    '_id': '60534086b68128b3509c0a73',
    'truncCode': 'c0a73',
    'isFinished': true,
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


describe('Post /session', () =>{
  it('Post Sessions with preference and results', async (done) =>{
    const body = {'preferences': {}, 'results': []};

    const response = await axios.post(`http://localhost:${port}/sessions`, body);
    const returnEvent = response.data;
    expect(returnEvent.sessionId).toBeDefined();
    const code = returnEvent.sessionId.substr(returnEvent.sessionId.length - 5);
    expect(returnEvent.truncCode).toBe(code);
    console.log(returnEvent.sessionId);
    console.log(code);
    done();
  } );
});
