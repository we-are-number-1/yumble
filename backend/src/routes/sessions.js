import express from 'express';
import Restaurant from '../mongo/models/Restaurant';
const router = express.Router();

// GET: Test JSON for a card
router.get('/testCard', async (req, res) => {
  const testCard = new Restaurant({
    name: 'Lonestar',
    location: 'Owen G Glen Building',
    cuisine: 'European',
    price: '5',
  });
  res.status(200).json(testCard);
});

module.exports = router;
