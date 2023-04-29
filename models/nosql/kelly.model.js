/**
 * Esquema de Mongoose para almacenar las opiniones de los usuarios sobre hoteles
 * @typedef {Object} KellySchema
 * @property {mongoose.Schema.Types.ObjectId} persona - ID de la persona que realiza la opinión
 * @property {mongoose.Schema.Types.ObjectId} hotel - ID del hotel sobre el que se realiza la opinión
 * @property {number} puntuacion - Puntuación del hotel según la opinión del usuario
 * @property {Date} createdAt - Fecha de creación de la opinión
 * @property {Date} updatedAt - Fecha de última actualización de la opinión
 */

const mongoose = require('mongoose');

/**
 * Esquema de Mongoose para almacenar las opiniones de los usuarios sobre hoteles
 * @type {kellySchema}
 */
const kellySchema = new mongoose.Schema({
  persona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  puntuacion: {
    type: Number,
    min: 1,
    max: 10
  }
}, { timestamps: true });

module.exports = mongoose.model('Kelly', kellySchema);

