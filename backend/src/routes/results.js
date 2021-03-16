import express from 'express';
import Result from '../mongo/models/Result';
const router = express.Router();

// Post: Creating a result object in the result collection
router.post('/', async (req, res) => {
  const result = new Result({
    sessionID: req.body.sessionID, result: req.body.result,
  });

  try {
    const newResult = await result.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

export default router;
