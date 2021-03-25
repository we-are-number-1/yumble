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


describe('Post /session', () =>{
  it('Post Sessions with preference and results', async (done) =>{
    const body = {'preferences': {}, 'results': []};

    const response = await axios.post(`http://localhost:${port}/sessions`, body);
    const returnEvent = response.data;
    const code = returnEvent.sessionId.substr(returnEvent.sessionId.length - 5);
    expect(returnEvent.sessionId).toBeDefined();
    expect(returnEvent.truncCode).toBe(code);
    if (response.status == 201) {
      console.log(`The session has been successfully created`);
      console.log(`The sessionID is: ${returnEvent.sessionId}`);
      console.log(`The session code is: ${code}`);
    } else if (response.status == 404) {
      console.log(`The session is failed, errer: 404`);
    } else {
      console.log(`The session is failed, errer: 500`);
    }

    done();
  } );
});
