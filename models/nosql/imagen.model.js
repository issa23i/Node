const mongoose = require('mongoose');


/**
 * Crea un nuevo esquema de imagen para almacenar en la base de datos.
 * @param {String} url - La URL de la imagen.
 * @param {String} filename - El nombre de archivo de la imagen.
 * @returns {Object} - El objeto Imagen creado.
*/
const imagenSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Imagen', imagenSchema);
