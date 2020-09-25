const mongoose = require('mongoose');

const PieceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  name: {
    type: 'String',
    required: true 
  },
  tempoTarget: {
    type: 'Number',
    required: true 
  },
  currentDay: {
    type: 'Number',
    default: 0
  },
  currentSession: {
    type: 'Number',
    default: 0,
  },
  sectionsCount: {
    type: 'Number',
    required: true
  },
  images: {
    type: ['String'],
  },
  plan: {
    type: ['Array'],
  },
});

module.exports = mongoose.model('Piece', PieceSchema);
