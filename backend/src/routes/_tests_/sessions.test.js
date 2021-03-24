
const {MongoMemoryServer} = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');
const sessions = require('../sessions');
const request = require('supertest');

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
      'price': 3,
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

describe('Unit Test', () =>{
  it('Post Sessions', async (done) =>{
    const response = await request(app).post('/sessions').send({
      preferences: '',
      results: '',
    });
    expect(response.body.sessionId).toEqual('');
    expect(response.body.truncCode).toEqual('');
    expect(response.statusCode).toBe(201);

    done();
  } );

  // it('invalid 400', async (done) =>{
  //   const body = {
  //     sessionId : '05334010727e7af37aa2824',
  //     truncCode : 'a2824'
  //   }
  //   const response = await request(app).post('/sessions').send({
  //     preferences: ,
  //     results: ,
  //     errorcheck: ,
  //   });
  //   expect(response.statusCode).toBe(400);
  //   done();
  // } );
});
