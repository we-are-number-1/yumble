import express from 'express';
import Result from '../mongo/models/Result';
const router = express.Router();

// GET: Get results of top three restaurants
router.get('/:id', async (req, res) => {
  Result.find({sessionId: req.params.id}, function(err, docs) {
    if (error) {
      console.log(err);
    } else {
      res.status(200).json(docs);
    }
  });
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

