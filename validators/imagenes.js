const { check } = require('express-validator')
const validateResuls = require('../utils/handleValidator')

const validationCreateItem = [
    check("url").exists().notEmpty(),
    check("filename").exists().notEmpty(),
    // TODO: quitar comentarios si valido tipo y objetoId
    //check("tipo").exists().notEmpty(),
    //check("objetoId").exists().notEmpty().isMongoId(),
    (req,res,next) => validateResuls(req,res,next)
]

module.exports = { validationCreateItem }