const express = require('express')
const router = express.Router() // invocar a el manejador Router
const {  validationRegister, validationLogin, validationUpdateItem } = require('../validators/auth')
const { registerController, loginController, updateItem } = require('../controllers/auth')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')

//  http://localhost:3001/api/auth/login
//  http://localhost:3001/api/auth/register
//  http://localhost:3001/api/auth/


/**
 * Crear un registro (item)
 */
router.post("/register", validationRegister, registerController ) // ruta, middleware, controlador


router.post("/login", validationLogin, loginController ) // ruta, middleware, controlador


router.put('/:id', validationUpdateItem, authMiddleware, checkRol(['user', 'admin']), updateItem)

module.exports = router