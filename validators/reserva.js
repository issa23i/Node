const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

/**
 * Validación de datos para crear una reserva
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
const validationCreateItem = [
  check('cliente').exists().notEmpty().isMongoId(),
  check('hotel').exists().notEmpty().isMongoId(),
  check('fechaCheckin').exists().notEmpty().isISO8601(),
  check('fechaCheckout').exists().notEmpty().isISO8601(),
  check('numPlazas').exists().notEmpty().isInt({ min: 1 }),
  check('habitacion').exists().notEmpty().isMongoId(),
  check('precioTotal').exists().notEmpty().isInt(),
  check('aceptada').exists().isBoolean(),
  (req, res, next) => validateResults(req, res, next)
];

/**
 * Validación de datos para obtener una reserva por ID
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
const validationGetItem = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validationCreateItem, validationGetItem };
