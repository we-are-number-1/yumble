import express from 'express';

const router = express.Router();

// GET: Returns the google API key from env var
router.get('/googleKey', async (req, res) => {
  const key = {
    googleKey: process.env.GOOGLE_API_KEY,
  };
  res.status(200).json(key);
});

// GET: Returns the foursquare API key from env var
router.get('/foursquareKey', async (req, res) => {
  const key = {
    foursquareID: process.env.FOURSQUARE_API_ID,
    foursquareSECRET: process.env.FOURSQUARE_API_SECRET,
  };
  res.status(200).json(key);
});

module.exports = router;
