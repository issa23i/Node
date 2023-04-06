const { check } = require('express-validator')
const validateResuls = require('../utils/handleValidator')

const validationCreateItem = [
    check("nombre").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("ciudad").exists().notEmpty(),
    check("descripcion").exists().notEmpty(),
    check("servicios").exists().notEmpty().isArray(),
    check("habitaciones").exists().notEmpty().isArray(),
    check("tieneSello").exists().notEmpty().isBoolean(),
    check("imagenes").exists().notEmpty().isArray(),
    (req,res,next) => validateResuls(req,res,next)
]

module.exports = { validationCreateItem }