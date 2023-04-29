/**
 * Define el esquema de una habitación y lo exporta como modelo de Mongoose
 * @typedef {Object} HabitacionSchema
 * @property {mongoose.Types.ObjectId} hotel - Id del hotel al que pertenece la habitación
 * @property {Number} num_plazas - Número de plazas disponibles en la habitación
 * @property {String} tipo_cama - Tipo de cama que se ofrece en la habitación
 * @property {String} vistas - Tipo de vistas que ofrece la habitación
 * @property {mongoose.Types.ObjectId[]} imagenes - Array de ids de las imágenes asociadas a la habitación
 * @property {Date} createdAt - Fecha de creación de la habitación (autogenerada por Mongoose)
 * @property {Date} updatedAt - Fecha de última actualización de la habitación (autogenerada por Mongoose)
*/

const mongoose = require('mongoose');


/**
 * Esquema de una habitación de hotel.
 * @type {habitacionSchema}
*/
const habitacionSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  num_plazas: {
    type: Number,
    required: true
  },
  tipo_cama: {
    type: String,
    enum: ['individual', 'grande', 'extra grande'],
    required: true
  },
  vistas: {
    type: String,
    required: true
  },
  imagenes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imagen'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Habitacion', habitacionSchema);
