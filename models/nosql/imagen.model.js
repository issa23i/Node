const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true // TODO: cambiar si se tiene que prescindir
  }
}, { timestamps: true });

module.exports = mongoose.model('Imagen', imagenSchema);
