const { check } = require('express-validator')
const validateResuls = require('../utils/handleValidator')

/**
 * Validación de los parámetros necesarios para crear un hotel en la base de datos.
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Middleware que permite avanzar al siguiente controlador de ruta.
 */
const validationCreateItem = [
    check("nombre").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("ciudad").exists().notEmpty(),
    check("descripcion").exists().notEmpty(),
    check("servicios").exists().notEmpty().isArray(),
    check("estrellas").exists().notEmpty().isNumeric({min:1,max:5}),
    check("tieneSello").exists().notEmpty().isBoolean(),
    check("imagenes").exists().notEmpty().isArray(),
    check("puntuacion_resenas").optional().isNumeric().withMessage('El campo puntuacion_resenas debe ser numérico'),
    
    (req,res,next) => validateResuls(req,res,next)
]

/**
 * Validación de los parámetros necesarios para obtener un hotel de la base de datos.
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Middleware que permite avanzar al siguiente controlador de ruta.
 */
const validationGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req,res,next) => validateResuls(req,res,next)
]


module.exports = { validationCreateItem, validationGetItem }