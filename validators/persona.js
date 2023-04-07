const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validationCreateItem = [
  check('nif').exists().notEmpty(),
  check('nombre').exists().notEmpty(),
  check('apellido1').exists().notEmpty(),
  check('apellido2').optional(),
  check('rol').optional().isIn(['admin', 'user', 'kelly']),
  (req, res, next) => validateResults(req, res, next)
];

const validationGetItem = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validationCreateItem, validationGetItem };
