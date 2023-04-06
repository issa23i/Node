const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true // TODO: cambiar si se tiene que prescindir
  },
  tipo: {
    type: String,
    enum: ['hotel', 'habitacion'],
    required: false // TODO: poner a true si se necesita
  },
  objetoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false // TODO: poner a true si se necesita
  }
}, { timestamps: true });

module.exports = mongoose.model('Imagen', imagenSchema);
