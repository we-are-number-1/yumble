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
          coords: {
            lat: 34.6424325,
            lng: 10.2343462,
          },
          price: '$$',
          rating: 3.5,
          images: '',
        },
        {
          name: 'Japanese Restaurant',
          location: '1 Japan Street',
          numberOfVotes: 3,
          coords: {
            lat: 34.123456,
            lng: 10.789101,
          },
          price: '$$',
          rating: 3.5,
          images: '',
        },
        {
          name: 'Chinese Restaurant',
          location: '1 China Street',
          numberOfVotes: 7,
          coords: {
            lat: 34.6424325,
            lng: 10.2343462,
          },
          price: '$$$$',
          rating: 4.3,
          images: '',
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
    expect(returnTask.results[0].location).toBe('1 Thai Street');
    expect(returnTask.results[0].numberOfVotes).toBe(5);
    expect(returnTask.results[1].name).toBe('Japanese Restaurant');
    expect(returnTask.results[1].coords.lat).toBe(34.123456);
    expect(returnTask.results[2].price).toBe('$$$$');
    expect(returnTask.results[2].rating).toBe(4.3);
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
    } else {
      console.log(`The session is failed, errer: 404`);
      console.log(`The session is failed, errer: 500`);
    }

    done();
  } );
});

describe('GET fail', () => {
  it('should recieve a 404 response', async (done) => {
    try {
      response = await axios.get(
          `http://localhost:${port}/sessions/${234567}`);
      console.log('the status was' + response.status);
    } catch (err) {
      expect(err.response.status).toBe(404);
      done();
    }
  });
});

describe('PATCH GET fail', () => {
  it('should recieve a 404 response', async (done) => {
    const body = {
      preferences: {},
      results: [],
    };

    await axios.post(`http://localhost:${port}/sessions`, body);

    const updateBody = {
      isFinished: true,
      preferences: {
        location: 'Sydney',
        distance: 10,
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


    try {
      await axios.patch(
          `http://localhost:${port}/sessions/${4567}`,
          updateBody,
      );
    } catch (err) {
      expect(err.response.status).toBe(404);
      done();
    }
  });
});

describe('GET', () => {
  it('should return the session object', async () => {
    const body = {
      preferences: {
        location: 'Sydney',
        distance: 10,
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
    expect(response.status).toBe(200);
  });
});
