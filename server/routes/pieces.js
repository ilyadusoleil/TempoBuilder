const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Piece = require('../models/Piece');
const User = require('../models/User');

// Add new piece
router.post('/', ensureAuth, async (req, res) => {
  console.log('here');
  try {
    console.log('new piece?', req.body);

    req.body.user = req.user.id;
    const created = await Piece.create(req.body);
    res.send(created);
  } catch (err) {
    console.error(err);
  }
});

// TODO change to patch
router.post('/currentPiece', ensureAuth, async (req, res) => {
  try {
    console.log('Update current Piece', req.body, 'id', req.user.id);

    const created = await User.findOneAndUpdate(
      { _id: req.user.id },
      { currentPiece: req.body.currentPiece },
      { new: true, useFindAndModify: false }
    );
    console.log('updated user? ', created);
    res.sendStatus(204);
    // res.send(created);
  } catch (err) {
    console.error(err);
  }
});

// TODO change to patch
router.post('/currentDay', ensureAuth, async (req, res) => {
  try {
    //req.body.id and req.body.(new)CurrentDay
    console.log('Update current Day', req.body, 'id', req.user.id);

    const created = await Piece.findOneAndUpdate(
      { _id: req.body.id },
      { currentDay: req.body.currentDay, currentSession: 0 },
      { new: true, useFindAndModify: false }
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
});

// TODO change to patch
router.post('/currentSession', ensureAuth, async (req, res) => {
  try {
    //req.body.id and req.body.(new)CurrentDay
    console.log('Update current Session', req.body, 'id', req.user.id);

    const created = await Piece.findOneAndUpdate(
      { _id: req.body.id },
      { currentSession: req.body.currentSession },
      { new: true, useFindAndModify: false }
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
});

// Get all pieces
router.get('/', ensureAuth, async (req, res) => {
  try {
    Piece.find({ user: req.user.id }).then((data) => {
      res.status(200);
      res.send(data);
    });
  } catch (err) {
    console.error(err);
  }
});

//TODO test
router.put('/', ensureAuth, async (req, res) => {
  try {
    console.log('Update (entire) PIECE', req.body.piece);

    await Piece.replaceOne({ _id: req.body.piece.id }, req.body.piece);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
});

router.delete('/', ensureAuth, async (req, res) => {
  try {
    console.log('Delete piece', req.body.id);

    await Piece.deleteOne({ _id: req.body.id });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
