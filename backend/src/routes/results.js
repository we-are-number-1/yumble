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

export default router;
