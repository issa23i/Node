/**
 * Inserta un registro en la base de datos de un hotel.
 * @param {Object} hotel - Objeto que contiene la información del hotel.
 * @param {string} hotel.nombre - El nombre del hotel.
 * @param {string} hotel.direccion - La dirección del hotel.
 * @param {string} hotel.ciudad - La ciudad donde se ubica el hotel.
 * @param {string} hotel.descripcion - La descripción del hotel.
 * @param {string[]} hotel.servicios - Los servicios que ofrece el hotel.
 * @param {number} hotel.estrellas - La cantidad de estrellas del hotel.
 * @param {boolean} hotel.tieneSello - Indica si el hotel tiene sello de calidad.
 * @param {Array} hotel.imagenes - Arreglo de IDs de las imágenes del hotel.
 * @param {number} hotel.puntuacion_resenas - La puntuación del hotel en las reseñas.
 * @returns {Promise<Object>} - Promesa que se resuelve con el objeto del hotel que se ha insertado.
*/

const mongoose = require('mongoose');

/**
 * Esquema de un hotel.
 * @type {hotelSchema}
*/
const hotelSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  servicios: {
    type: [String],
    required: true
  },
  estrellas: {
    type: Number,
    required: true
  },
  tieneSello: {
    type: Boolean,
    default: false,
    required: true
  },
  imagenes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imagen',
    required: true
  }],
  puntuacion_resenas: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
