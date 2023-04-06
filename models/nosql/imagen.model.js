const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true // cambiar si se tiene que prescindir
  },
  tipo: {
    type: String,
    enum: ['hotel', 'habitacion'],
    required: false // poner a true si se necesita
  },
  objetoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false // poner a true si se necesita
  }
}, { timestamps: true });

module.exports = mongoose.model('Imagen', imagenSchema);
