const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validationCreateItem = [
  check('nif').exists().notEmpty(),
  check('nombre').exists().notEmpty(),
  check('apellido1').exists().notEmpty(),
  check('apellido2').optional(),
  check('email').exists().isEmail(),
  check('password').exists().notEmpty(),
  check('rol').exists().isIn(['admin', 'user', 'kelly']),
  (req, res, next) => validateResults(req, res, next)
];

const validationUpdateItem = [
  check('email').exists().isEmail(),
  check('password').exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next)
];

const validationGetItem = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validationCreateItem, validationGetItem, validationUpdateItem };
