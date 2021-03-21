import express from 'express';
import Session from '../mongo/models/Session';
import games from '../domain/Games';
import {SocketSession} from '../domain/models/SocketSession';
import {io} from '../index';

const router = express.Router();

/*  POST /sessions – Create a new Session and
  return the sessionId and the truncated sessionId */
router.post('/', async (req, res) => {
  const session = new Session({
    preferences: req.body.preferences,
    results: req.body.results,
  });

  let mongoId;
  let code;


  try {
    const newSession = await session.save();
    mongoId = newSession._id;
    const mongoIdString = newSession._id.toString();
    code = mongoIdString.substr(mongoIdString.length - 5);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

  try {
    await Session.updateOne(
        {_id: mongoId},
        {$set: {truncCode: code}},
    );

    res.status(201).json({sessionId: mongoId, truncCode: code});
  } catch (error) {
    res.status(500).json({message: error.message});
  }

  console.log(`game created with code: ${code}`);
  const sessionRoom = new SocketSession(
      code,
      null,
      {'roundInterval': 5000});

  games.newGame(
      io,
      sessionRoom,
      {
        length: 10,
      });
});

// GET /sessions/:id – Get the session object with the provided id
router.get('/:id', getSession, (req, res) => {
  res.status(200).json(res.session);
});

// PATCH /sessions/:id – Update the session with prefereces or results
router.patch('/:id', getSession, async (req, res) => {
  if (req.body.isFinished != null) {
    res.session.isFinished = req.body.isFinished;
  }
  if (req.body.preferences != null) {
    res.session.preferences = req.body.preferences;
    games.getGame(req.params.id)
        .roundInterval = req.body.preferences.timer * 1000;
  }
  if (req.body.results != null) {
    res.session.results = req.body.results;
  }

  try {
    const updatedSession = await res.session.save();
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

/**
 *
 * @param {object} req - request from frontend with truncCode
 * @param {object} res - response from database session
 * @param {function} next - function is used to go to the next middleware
 * @return {void} - doesn't return anything just used to interface with handlers
 */
async function getSession(req, res, next) {
  let session;
  try {
    session = await Session.findOne({truncCode: req.params.id});
    if (session == null) {
      return res
          .status(404)
          .json({message: 'Could not find session with that id'});
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }

  res.session = session;
  next();
}

module.exports = router;
