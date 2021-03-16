import express from 'express';
import Result from '../mongo/modelsResult';
const router = express.Router();

// Post: Creating a result document in the result collection
router.post('/', async (req, res) => {
  const result = new Result({
    sessionId: req.body.sessionId, result: req.body.result,
  });

  try {
    const newResult = await result.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

export default router;

