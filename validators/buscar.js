const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validationSearchParams = [
  check('city').exists().notEmpty(),
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

module.exports = { validationSearchParams };


