const { validationResult } = require('express-validator')

/**
 * Valida los resultados de una petición HTTP usando las reglas de validación definidas por express-validator
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Función para pasar al siguiente middleware o controlador
*/
const validateResuls = (req, res, next) => {
    try {
        validationResult(req).throw() // si no valida, crashea
        return next() // si valida, pasa al controlador
    } catch (err) {
        res.status(403)
        res.send({errors : err.array()})
    }
}

module.exports = validateResuls