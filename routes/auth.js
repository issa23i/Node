const express = require('express')
const { matchedData } = require('express-validator')
const router = express.Router() // invocar a el manejador Router
const {  validationRegister, validationLogin } = require('../validators/auth')
const { encrypt, compare } = require('../utils/handlePassword')
const { personaModel } = require('../models')

// TODO: http://localhost:3001/api/auth/login
// TODO: http://localhost:3001/api/auth/register


/**
 * Crear un registro (item)
 */
router.post("/register", validationRegister, async (req, res) => {
    req = matchedData(req)
    const password = await encrypt(req.password) // coge el password del request y lo hashea
    const body = {...req, password} // recoge el req y sobreescribe el password ya hasheado
    const data = await personaModel.create(body) // crea un nueva persona en la base de datos
    data.set("password", undefined, {strict: false}) // hacer que la data no contenga el password
    res.send({data})
} ) 




module.exports = router