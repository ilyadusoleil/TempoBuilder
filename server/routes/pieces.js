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

router.post('/currentPiece', ensureAuth, async (req, res) => {
  try {
    console.log('Update current Piece', req.body, 'id', req.user.id);

    const created = await User.findOneAndUpdate(
      { _id: req.user.id },
      { currentPiece: req.body.currentPiece },
      { new: true, useFindAndModify: false }
    );
    console.log('updated user? ', created)
    res.sendStatus(204);
    // res.send(created);
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

module.exports = router;
