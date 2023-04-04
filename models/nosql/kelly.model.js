const mongoose = require('mongoose');

const kellySchema = new mongoose.Schema({
  persona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  puntuacion: {
    type: Number,
    min: 1,
    max: 10
  }
}, { timestamps: true });

module.exports = mongoose.model('Kelly', kellySchema);

