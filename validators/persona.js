const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

/**
 * Validación para crear un nuevo usuario
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP 
 * @param {*} next - Siguiente middleware
 */
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

/**
 * Validación para actualizar un usuario existente
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP 
 * @param {*} next - Siguiente middleware
 */
const validationUpdateItem = [
  check('email').exists().isEmail(),
  check('password').exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next)
];

/**
 * Validación para obtener un usuario existente por su ID
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP 
 * @param {*} next - Siguiente middleware
 */
const validationGetItem = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validationCreateItem, validationGetItem, validationUpdateItem };
