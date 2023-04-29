/**
 * Esquema para una reserva de hotel
 * @typedef {Object} Reserva
 * @property {mongoose.Types.ObjectId} cliente - Identificador del cliente que realiza la reserva
 * @property {mongoose.Types.ObjectId} hotel - Identificador del hotel en el que se realiza la reserva
 * @property {Date} fechaCheckin - Fecha de entrada a la habitación reservada
 * @property {Date} fechaCheckout - Fecha de salida de la habitación reservada
 * @property {Number} numPlazas - Número de plazas de la habitación reservada
 * @property {mongoose.Types.ObjectId} habitacion - Identificador de la habitación reservada
 * @property {Number} precioTotal - Precio total de la reserva
 * @property {Boolean} aceptada - Indica si la reserva ha sido aceptada por el hotel
 */

const mongoose = require('mongoose');

/**
Esquema de Mongoose para una reserva.
@type {reservaSchema}
*/
const reservaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  fechaCheckin: {
    type: Date,
    required: true
  },
  fechaCheckout: {
    type: Date,
    required: true
  },
  numPlazas: {
    type: Number,
    required: true
  },
  habitacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  },
  precioTotal: {
    type: Number,
    required: true
  },
  aceptada: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);
