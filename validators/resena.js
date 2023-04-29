const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

/**
 * Validación para crear una nueva reseña
 * @param {Object} req - Petición HTTP
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar la solicitud al siguiente middleware
 */
const validationCreateResena = [
  check('reserva').exists().notEmpty().isMongoId(),
  check('cliente').exists().notEmpty().isMongoId(),
  check('puntuacion').exists().notEmpty().isInt({ min: 1, max: 5 }),
  check('comentario').exists().notEmpty().isString(),
  (req, res, next) => validateResults(req, res, next)
];

/**
 * Validación para obtener una reseña por su identificador único
 * @param {Object} req - Petición HTTP
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar la solicitud al siguiente middleware
 */
const validationGetResena = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validationCreateResena, validationGetResena };
