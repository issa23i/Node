const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  num_plazas: {
    type: Number,
    required: true
  },
  tipo_cama: {
    type: String,
    enum: ['individual', 'grande', 'extra grande'],
    required: true
  },
  vistas: {
    type: String,
    required: true
  },
  precios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PrecioHabitacion'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Habitacion', habitacionSchema);
