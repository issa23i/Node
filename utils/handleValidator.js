const { validationResult } = require('express-validator')

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