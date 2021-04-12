import MongoMemoryServer from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';

import Session from '../models/Session';
import * as mongo from '../../mongo/index';

let mongoServer;
let server;
let collection;

describe('MongoDB startup functions', () => {
  const OLD_ENV = process.env;

  beforeAll(async (done) => {
    mongoServer = new MongoMemoryServer();

    const connectionString = await mongoServer.getUri();
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const app = express();
    app.use(express.json());

    server = app.listen(0, () => {
      done();
    });
  });

  beforeEach(async () => {
    collection = await mongoose.connection.db.createCollection('sessions');

    jest.resetModules();
    process.env = {...OLD_ENV};
    process.env.SESSION_EXPIRY = '604800';
  });

  afterEach(async () => {
    await mongoose.connection.db.dropCollection('sessions');
  });

  afterAll((done) => {
    server.close(async () => {
      await mongoose.disconnect();
      await mongoServer.stop();

      process.env = OLD_ENV;
      done();
    });
  });

  test('Create createdAt index', async (done) => {
    await mongo.configureSessionIndexes();
    const indexIsCreated = await mongo.collectionHasIndex(Session, 'createdAt');

    expect(indexIsCreated).toBe(true);
    done();
  });

  test('Create createdAt index when it exists already', async (done) => {
    Session.collection.createIndex({'createdAt': 1},
        {expireAfterSeconds: process.env.SESSION_EXPIRY});
    await mongo.configureSessionIndexes();
    const indexIsCreated = await mongo.collectionHasIndex(Session, 'createdAt');

    expect(indexIsCreated).toBe(true);
    done();
  });

  test('Session expires correctly', async (done) => {
    process.env.SESSION_EXPIRY = 0;
    await mongo.configureSessionIndexes();

    const mockSession = new Session({
      _id: '123',
      preferences: {},
      results: [], createdAt: Date.now,
    });
    await collection.insertOne(mockSession)
        .catch((err) => done.fail(new Error(err.message)));

    const foundSession = await collection.findOne({_id: '123'})
        .catch((err) => done.fail(new Error(err.message)));

    expect(foundSession).toBeNull();
    done();
  });
});
