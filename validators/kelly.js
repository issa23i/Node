const { check } = require('express-validator')
const validateResuls = require('../utils/handleValidator')

const validationCreateItem = [
    check("persona").exists().notEmpty().isMongoId(),
    check("hotel").exists().notEmpty().isMongoId(),
    check("puntuacion").optional().isInt({ min: 1, max: 10 }),
    (req,res,next) => validateResuls(req,res,next)
]

const validationGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req,res,next) => validateResuls(req,res,next)
]

module.exports = { validationCreateItem, validationGetItem }
