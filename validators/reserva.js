const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validationCreateItem = [
  check('cliente').exists().notEmpty().isMongoId(),
  check('hotel').exists().notEmpty().isMongoId(),
  check('fechaCheckin').exists().notEmpty().isISO8601(),
  check('fechaCheckout').exists().notEmpty().isISO8601(),
  check('numPlazas').exists().notEmpty().isInt({ min: 1 }),
  check('habitaciones').isArray(),
  (req, res, next) => validateResults(req, res, next)
];

const validationGetItem = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validationCreateItem, validationGetItem };
