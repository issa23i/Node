/**
 * Esquema para una reseña de una reserva en la base de datos
 * @typedef {Object} Resena
 * @property {mongoose.Schema.Types.ObjectId} reserva - Id de la reserva asociada a la reseña
 * @property {mongoose.Schema.Types.ObjectId} cliente - Id del cliente que hace la reseña
 * @property {Number} puntuacion - Puntuación del cliente de 1 a 5
 * @property {String} comentario - Comentario del cliente sobre la reserva
 * @property {Date} fecha - Fecha en que se hace la reseña
 */

const mongoose = require('mongoose');

/**
Esquema de Mongoose para una reseña.
@type {resenaSchema}
*/
const resenaSchema = new mongoose.Schema({
  reserva: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reserva',
    required: true
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  puntuacion: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resena', resenaSchema);
