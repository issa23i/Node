const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const tipoCama = ['individual', 'grande', 'extra grande']

/**
 * Validaciones para la creación de una habitación
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP 
 * @param {*} next - Función para pasar al siguiente middleware
 */

const validationCreateItem = [  
    check('hotel').exists().notEmpty().isMongoId(),  
    check('num_plazas').exists().notEmpty().isInt({ min: 1 }),  
    check('tipo_cama').exists().notEmpty().isIn(tipoCama),
    check('vistas').exists().notEmpty(),
    check('imagenes').isArray(),
  (req, res, next) => validateResults(req, res, next)
]

/**
 * Validaciones para obtener una habitación por su ID
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP 
 * @param {*} next - Función para pasar al siguiente middleware
 */
const validationGetItem = [  check('id').exists().notEmpty().isMongoId(),  (req, res, next) => validateResults(req, res, next)]

module.exports = { validationCreateItem, validationGetItem, tipoCama }
