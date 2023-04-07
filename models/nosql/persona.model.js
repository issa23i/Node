const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
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
  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true,
    select: false // en false, no se mostrará la contraseña en las consultas
  },
  rol: {
    type: String,
    enum: ['admin', 'user', 'kelly'],
    default: 'user',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Persona', personaSchema);
