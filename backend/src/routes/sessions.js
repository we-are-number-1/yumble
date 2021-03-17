import express from 'express';
import Session from '../mongo/models/Session';
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

export default router;
