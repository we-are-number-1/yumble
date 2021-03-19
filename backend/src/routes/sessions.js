import express from 'express';
import Session from '../mongo/models/Session';
import Restaurant from '../mongo/models/Restaurant';

import {photos} from './dummyPhotoParser';

const router = express.Router();

// GET: Creates and returns the sessionId of a new session
router.get('/', async (req, res) => {
  const session = new Session({
    isFinished: false,
  });

  try {
    const newSession = await session.save();
    res.status(201).json({sessionId: newSession._id});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// GET: Test JSON for a card
router.get('/testCard', async (req, res) => {
  const testCard = new Restaurant({
    name: 'Lone Star Cafe & Bar',
    location: 'Wiri',
    price: '$$',
    images: photos,
    // cuisine not available in Google Places API
    cuisine: 'European ', 
    rating: '4.2',
    menu: [],
  });
  res.status(200).json(testCard);
});

module.exports = router;
