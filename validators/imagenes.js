const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validationCreateItem = [
    check("url").exists().notEmpty(),
    check("filename").exists().notEmpty(),
    // TODO: quitar comentarios si valido tipo y objetoId
    //check("tipo").exists().notEmpty(),
    //check("objetoId").exists().notEmpty().isMongoId(),
    (req,res,next) => validateResults(req,res,next)
]

module.exports =  validationCreateItem 