import mongoose from 'mongoose';
import Session from './models/Session';

/**
 * Connect to the MongoDB database, using the ATLAS_URI from .env
 */
function connect() {
  const mongoUri = process.env.ATLAS_URI;
  mongoose.connect(
      mongoUri,
      {useNewUrlParser: true, useUnifiedTopology: true},
      (err) => {
        if (err) {
          throw err;
        } else {
          console.log('Successfully connected to MongoDB Atlas.');
        }
      },
  );
}

/**
 * Refresh the database indexes for {Session}. If you want to set a different
 * expiry for the {Session} MongoDB schema, you MUST drop the index and recreate
 *
 * This function is therefore called everytime you restart the app to avoid
 * expiry issues (see issue #296)
 */
async function configureSessionIndexes() {
  const sessionExpiry = parseInt(process.env.SESSION_EXPIRY);
  const ascendingIndexMode = 1;
  const mongoDefinitionSuffix = '_1'; // Mongo appends suffix to definition

  if (await collectionHasIndex(Session, 'createdAt')) {
    await Session.collection.dropIndex('createdAt' + mongoDefinitionSuffix);
  }
  await Session.collection.createIndex({'createdAt': ascendingIndexMode},
      {expireAfterSeconds: sessionExpiry});

  console.log('Successfully configured MongoDB Atlas collection');
}

/**
 * Helper function to check if index for a schema exists in the db collection
 * @param {*} schema, MongoDB model
 * @param {*} indexName, string, the name of the index to search for
 * @return {boolean}
 */
async function collectionHasIndex(schema, indexName) {
  const indexes = await schema.collection.getIndexes();
  let hasIndex = false;

  // getIndexes() returns an object, which contains keys of each index,
  // the values being [ [indexName, mode] ]
  Object.values(indexes).forEach((index) => {
    if (index[0][0] === indexName) {
      hasIndex = true;
    }
  });

  return hasIndex;
}

export {connect, configureSessionIndexes, collectionHasIndex};
