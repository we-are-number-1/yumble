import axios from 'axios';

/**
 * @param {number} platform is 0 for google and 1 for forsquare
 * @return {number} returns either just a key or an array
 */
async function getAPIKey(platform) {
  if (platform === 0) {
    const response = await axios.get('/api/keys/googleKey');
    return response.data.googleKey;
  } else if (platform === 1) {
    const response = await axios.get('/api/keys/foursquareKey');
    return [response.data.foursquareID, response.data.foursquareSECRET];
  }
}

export default getAPIKey;
