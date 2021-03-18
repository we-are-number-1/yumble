import express from 'express';
import Result from '../mongo/models/Result';
const router = express.Router();

// GET: Get results of top three restaurants
router.get('/:id', async (req, res, next) => {
  let result;
  try {
    result = await Result.find({sessionID: req.params.id});
    if (result == null) {
      return res.status(404).json({message: 'Can not find the result'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }

  res.json(result);
  next();
});

// Post: Creating a result object in the result collection
router.post('/', async (req, res) => {
  const result = new Result({
    sessionID: req.body.sessionID, restaurants: req.body.restaurants,
  });

  try {
    const newResult = await result.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

export default router;

