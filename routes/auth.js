const express = require('express')
const router = express.Router() // invocar a el manejador Router
const {  validationRegister, validationLogin } = require('../validators/auth')
const { registerController, loginController } = require('../controllers/auth')

// TODO: http://localhost:3001/api/auth/login
// TODO: http://localhost:3001/api/auth/register


/**
 * Crear un registro (item)
 */
router.post("/register", validationRegister, registerController ) // ruta, middleware, controlador


router.post("/login", validationLogin, loginController ) // ruta, middleware, controlador

module.exports = router