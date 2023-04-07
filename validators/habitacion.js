const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validationCreateItem = [  
    check('hotel').exists().notEmpty().isMongoId(),  
    check('num_plazas').exists().notEmpty().isInt({ min: 1 }),  
    check('tipo_cama').exists().notEmpty().isIn(['individual', 'grande', 'extra grande']),
    check('vistas').exists().notEmpty(),
    check('imagenes').isArray(),
  (req, res, next) => validateResults(req, res, next)
]

const validationGetItem = [  check('id').exists().notEmpty().isMongoId(),  (req, res, next) => validateResults(req, res, next)]

module.exports = { validationCreateItem, validationGetItem }
