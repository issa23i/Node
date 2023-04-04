const mongoose = require('mongoose');

const precioHabitacionSchema = new mongoose.Schema({
  habitacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  },
  fecha_inicio: {
    type: Date,
    required: true
  },
  fecha_fin: {
    type: Date,
    required: true
  },
  precio: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('PrecioHabitacion', precioHabitacionSchema);
