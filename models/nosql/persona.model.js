const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nif: {
    type: String,
    unique: true,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido1: {
    type: String,
    required: true
  },
  apellido2: {
    type: String
  },
  rol: {
    type: String,
    enum: ['admin', 'user', 'kelly'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('Persona', userSchema);
