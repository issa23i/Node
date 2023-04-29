const { check } = require('express-validator')
const validateResuls = require('../utils/handleValidator')

/**
 * Validación de la solicitud de obtención de una imagen por su ID.
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Siguiente función a ejecutar
 */
const validationGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req,res,next) => validateResuls(req,res,next)
]


module.exports = validationGetItem