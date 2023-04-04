const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  fechaCheckin: {
    type: Date,
    required: true
  },
  fechaCheckout: {
    type: Date,
    required: true
  },
  numPlazas: {
    type: Number,
    required: true
  },
  habitaciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  }]
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);
