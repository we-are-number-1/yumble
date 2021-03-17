import express from 'express';
import Preference from '../mongo/models/Preference';
const router = express.Router();

// POST: Creating a preferences document in the preferences collection
router.post('/', async (req, res) => {
  const preferences = new Preference({
    sessionId: req.body.sessionId,
    location: req.body.location,
    distance: req.body.distance,
    cuisines: req.body.cuisines,
    price: req.body.price,
  });

  try {
    const newPreferences = await preferences.save();
    res.status(201).json(newPreferences);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

export default router;
