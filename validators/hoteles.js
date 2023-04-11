const { check } = require('express-validator')
const validateResuls = require('../utils/handleValidator')

const validationCreateItem = [
    check("nombre").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("ciudad").exists().notEmpty(),
    check("descripcion").exists().notEmpty(),
    check("servicios").exists().notEmpty().isArray(),
    check("tieneSello").exists().notEmpty().isBoolean(),
    check("imagenes").exists().notEmpty().isArray(),
    check("puntuacion_resenas").optional().isNumeric().withMessage('El campo puntuacion_resenas debe ser numérico'),
    
    (req,res,next) => validateResuls(req,res,next)
]

const validationGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req,res,next) => validateResuls(req,res,next)
]


module.exports = { validationCreateItem, validationGetItem }