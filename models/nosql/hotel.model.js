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
  tieneSello: {
    type: Boolean,
    default: false,
    required: true
  },
  imagenes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imagen',
    required: true
  }],
  puntuacion_resenas: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
