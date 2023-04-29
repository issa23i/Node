const { check } = require('express-validator')
const validateResuls = require('../utils/handleValidator')

/**
 * Validaciones para crear una nueva reseña en la base de datos
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Middleware para pasar a la siguiente función
 */
const validationCreateItem = [
    check("persona").exists().notEmpty().isMongoId(),
    check("hotel").exists().notEmpty().isMongoId(),
    check("puntuacion").optional().isInt({ min: 1, max: 10 }),
    (req,res,next) => validateResuls(req,res,next)
]

/**
 * Validaciones para obtener una reseña de la base de datos por su ID
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Middleware para pasar a la siguiente función
 */
const validationGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req,res,next) => validateResuls(req,res,next)
]

/**
 * Validaciones para actualizar una reseña existente en la base de datos
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Middleware para pasar a la siguiente función
 */
const validationUpdateItem = [
    check("hotel").exists().notEmpty().isMongoId(),
    check("puntuacion").optional().isInt({ min: 1, max: 10 }),
    (req, res, next) => validateResults(req, res, next)
  ];

module.exports = { validationCreateItem, validationGetItem, validationUpdateItem }
