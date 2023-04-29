/**
 * Modelo de PrecioHabitacion para guardar precios de habitaciones en diferentes fechas
 * @typedef {Object} PrecioHabitacion
 * @property {string} habitacion - El id de la habitación asociada al precio
 * @property {Date} fecha_inicio - Fecha de inicio de la validez del precio
 * @property {Date} fecha_fin - Fecha de fin de la validez del precio
 * @property {number} precio - Precio de la habitación en la fecha indicada
 */

const mongoose = require('mongoose');

/**
Esquema de Mongoose para un precio de habitación.
@type {precioHabitacionSchema}
*/
const precioHabitacionSchema = new mongoose.Schema({
  habitacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  },
  fecha_inicio: {
    type: Date,
    required: true
  },
  fecha_fin: {
    type: Date,
    required: true
  },
  precio: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('PrecioHabitacion', precioHabitacionSchema);
