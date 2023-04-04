const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
  reserva: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reserva',
    required: true
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  puntuacion: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resena', resenaSchema);
