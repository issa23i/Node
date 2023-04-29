const { check } = require("express-validator");
const validateResuls = require("../utils/handleValidator");

/**
 * Validación de registro de usuario
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {function} next - Función que llama al siguiente middleware
 * @returns {void}
 */
const validationRegister = [
  check("nif")
    .exists()
    .notEmpty()
    .matches(/^([0-9]{8}[a-zA-Z])$/),

  check("nombre").exists().notEmpty().isLength({ min: 2, max: 99 }),

  check("apellido1").exists().notEmpty().isLength({ min: 2, max: 99 }),

  check("apellido2").exists().notEmpty().isLength({ min: 2, max: 99 }),

  check("email").exists().notEmpty().isEmail(),

  check("password")
    .exists()
    .notEmpty()
    .isLength({ min: 8, max: 24 }) // entre 8 y 24 caracteres
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,24}$/), // minuscula, mayuscula y número

  (req, res, next) => validateResuls(req, res, next),
];

/**
 * Validación de inicio de sesión
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {function} next - Función que llama al siguiente middleware
 * @returns {void}
 */
const validationLogin = [
  check("email").exists().notEmpty().isEmail(),

  check("password")
    .exists()
    .notEmpty()
    .isLength({ min: 8, max: 24 }) // entre 8 y 24 caracteres
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,24}$/), // minuscula, mayuscula y número

  (req, res, next) => validateResuls(req, res, next),
];

/**
 * Validación de actualización de elemento
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {function} next - Función que llama al siguiente middleware
 * @returns {void}
 */
const validationUpdateItem = [
    check("email").exists().notEmpty().isEmail(),

    check("password")
      .exists()
      .notEmpty()
      .isLength({ min: 8, max: 24 }) // entre 8 y 24 caracteres
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,24}$/), // minuscula, mayuscula y número
  
    (req, res, next) => validateResuls(req, res, next),
];

module.exports = { validationRegister, validationLogin, validationUpdateItem };
