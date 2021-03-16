import express from 'express';
import Result from '../mongo/models/Result';
const router = express.Router();

// Post: Creating a result object in the result collection
router.post('/', async (req, res) => {
  const result = new Result({
    sessionId: req.body.sessionId,
    restaurant: req.body.restaurant,
  });

  try {
    const newResult = await result.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// GET: Get results
router.get('/results/:id', async (req, res) => {
  const result = new Result({
    sessionId: req.params.id,
    restaurant: req.result.restaurant,
  });

  try {
    const newResult = await result.save();
    res.status(200).json(newResult);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

export default router;
