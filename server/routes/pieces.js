const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Piece = require('../models/Piece');

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
