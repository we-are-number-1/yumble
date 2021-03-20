import express from 'express';
require('dotenv').config();

const router = express.Router();

// GET: Returns the google API key from env var
router.get('/googleKey', async (req, res) => {
  const key = {
    googleKey: process.env.GOOGLE_API_KEY,
  };
  res.status(200).json(key);
});

export default router;
