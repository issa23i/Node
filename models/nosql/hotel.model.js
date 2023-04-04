const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  servicios: {
    type: [String],
    required: true
  },
  habitaciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion'
  }],
  tieneSello: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
