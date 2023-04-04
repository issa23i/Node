const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['hotel', 'habitacion'],
    required: true
  },
  objetoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Imagen', imagenSchema);
