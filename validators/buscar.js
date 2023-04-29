const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

/**
 * Validación de parámetros de búsqueda de habitaciones.
 * @param {*} req - Petición HTTP con los siguientes parámetros:
 * - ciudad: la ciudad donde se busca la habitación
 * - checkIn: la fecha de entrada a la habitación (mayor que la fecha actual)
 * - checkOut: la fecha de salida de la habitación (posterior a la fecha de entrada)
 * - viajeros: la cantidad de personas que se hospedarán en la habitación (entre 1 y 10)
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Función middleware
*/
const validationSearchParams = [
  check('ciudad').exists().notEmpty(),
  check('checkIn').exists().notEmpty().isDate().isAfter(), // mayor que fecha actual
  check('checkOut').exists().notEmpty().isDate().custom((value, {req}) => {
    if (value <= req.body.checkIn) {
      throw new Error('La fecha de salida debe ser posterior a la fecha de entrada');
    }
    return true;
  }),
  check('viajeros').exists().isInt({ min: 1, max: 10 }),
  (req, res, next) => validateResults(req, res, next)
];

/**
 * Validación de parámetros de búsqueda de hoteles.
 * @param {*} req - Petición HTTP con los siguientes parámetros:
 * - checkIn: la fecha de entrada al hotel (mayor que la fecha actual)
 * - checkOut: la fecha de salida del hotel (posterior a la fecha de entrada)
 * - viajeros: la cantidad de personas que se hospedarán en el hotel (entre 1 y 10)
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Función middleware
*/
const validationSearchParamsHotel = [
  check('checkIn').exists().notEmpty().isDate().isAfter(), // mayor que fecha actual
  check('checkOut').exists().notEmpty().isDate().custom((value, {req}) => {
    if (value <= req.body.checkIn) {
      throw new Error('La fecha de salida debe ser posterior a la fecha de entrada');
    }
    return true;
  }),
  check('viajeros').exists().isInt({ min: 1, max: 10 }),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validationSearchParams, validationSearchParamsHotel };


