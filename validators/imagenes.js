const { check } = require('express-validator')
const validateResuls = require('../utils/handleValidator')


const validationGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req,res,next) => validateResuls(req,res,next)
]


module.exports = validationGetItem