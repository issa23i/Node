const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validationCreateResena = [
  check('reserva').exists().notEmpty().isMongoId(),
  check('cliente').exists().notEmpty().isMongoId(),
  check('puntuacion').exists().notEmpty().isInt({ min: 1, max: 5 }),
  check('comentario').exists().notEmpty().isString(),
  (req, res, next) => validateResults(req, res, next)
];

const validationGetResena = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validationCreateResena, validationGetResena };
